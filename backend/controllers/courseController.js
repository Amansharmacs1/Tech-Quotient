import User from "../models/User.js";

import Course from '../models/Course.js';
import { getStoreData, addCourse, updateCourse as storeUpdateCourse, deleteCourse as storeDeleteCourse } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all courses (supports both student & faculty queries)
// @route   GET /api/courses
export const getCourses = async (req, res, next) => {
  try {
    const { status, search } = req.query;

    try {
      const query = {};
      if (status) query.status = status;
      if (search) {
        query.$or = [
          { courseName: { $regex: search, $options: 'i' } },
          { courseCode: { $regex: search, $options: 'i' } },
          { title: { $regex: search, $options: 'i' } }
        ];
      }

      
      let courses = await Course.find(query).sort({ createdAt: -1 });
      
      if (req.user && req.user.role === 'student') {
        const user = await User.findById(req.user._id);
        if (user && user.courseProgress) {
          courses = courses.map(course => {
            const courseObj = course.toObject();
            const p = user.courseProgress.find(cp => cp.courseId.toString() === courseObj._id.toString());
            courseObj.progress = p ? p.progress : 0;
            return courseObj;
          });
        } else {
          courses = courses.map(course => {
            const courseObj = course.toObject();
            courseObj.progress = 0;
            return courseObj;
          });
        }
      }

      if (courses && courses.length > 0) {
        return res.json({
          success: true,
          data: courses,
          courses
        });
      }
    } catch (dbErr) {}

    // Fallback store
    let courses = getStoreData().courses;
    if (status) {
      courses = courses.filter(c => c.status?.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const s = search.toLowerCase();
      courses = courses.filter(c => 
        (c.courseName && c.courseName.toLowerCase().includes(s)) ||
        (c.title && c.title.toLowerCase().includes(s)) ||
        (c.courseCode && c.courseCode.toLowerCase().includes(s)) ||
        (c.code && c.code.toLowerCase().includes(s))
      );
    }

    return res.json({
      success: true,
      data: courses,
      courses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
export const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      let course = null;
      if (id.length === 24) {
        course = await Course.findById(id);
      }
      if (!course) {
        course = await Course.findOne({ $or: [{ courseCode: id }, { code: id }] });
      }
      if (course) {
        return res.json({
          success: true,
          data: course,
          course
        });
      }
    } catch (dbErr) {}

    const store = getStoreData();
    const course = store.courses.find(c => c.id === id || c._id === id || c.code === id || c.courseCode === id);

    if (!course) {
      return sendError(res, 'Course not found', 404);
    }

    return res.json({
      success: true,
      data: course,
      course
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a course (Faculty only)
// @route   POST /api/courses
export const createCourse = async (req, res, next) => {
  try {
    const facultyId = req.user?.id || req.user?._id || 'user-faculty-1';

    try {
      const newCourse = await Course.create({
        ...req.body,
        courseCode: req.body.courseCode || req.body.code,
        courseName: req.body.courseName || req.body.title,
        facultyId
      });

      return res.status(201).json({
        success: true,
        data: newCourse,
        course: newCourse
      });
    } catch (dbErr) {
      const newCourse = addCourse({
        ...req.body,
        courseCode: req.body.courseCode || req.body.code,
        courseName: req.body.courseName || req.body.title,
        title: req.body.title || req.body.courseName,
        code: req.body.code || req.body.courseCode,
        facultyId
      });

      return res.status(201).json({
        success: true,
        data: newCourse,
        course: newCourse
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update a course (Faculty only)
// @route   PUT /api/courses/:id
export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const updated = await Course.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (updated) {
        return res.json({
          success: true,
          data: updated,
          course: updated
        });
      }
    } catch (dbErr) {}

    const updated = storeUpdateCourse(id, req.body);
    if (!updated) {
      return sendError(res, 'Course not found', 404);
    }

    return res.json({
      success: true,
      data: updated,
      course: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a course (Faculty only)
// @route   DELETE /api/courses/:id
export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const deleted = await Course.findByIdAndDelete(id);
      if (deleted) {
        return sendSuccess(res, { message: 'Course deleted successfully' });
      }
    } catch (dbErr) {}

    storeDeleteCourse(id);
    return sendSuccess(res, { message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
};


export const getCourseProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    let progress = user.courseProgress?.find(p => p.courseId.toString() === id);
    if (!progress) {
      progress = { courseId: id, progress: 0, modules: [] };
    }
    
    return res.json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
};

export const updateCourseProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { moduleId, topicId, done, currentCourseModules } = req.body;
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    if (!user.courseProgress) {
      user.courseProgress = [];
    }
    
    let progressIndex = user.courseProgress.findIndex(p => p.courseId.toString() === id);
    if (progressIndex === -1) {
      user.courseProgress.push({ courseId: id, progress: 0, modules: [] });
      progressIndex = user.courseProgress.length - 1;
    }
    
    const progressObj = user.courseProgress[progressIndex];
    
    let moduleIndex = progressObj.modules.findIndex(m => m.moduleId === moduleId?.toString());
    if (moduleIndex === -1 && moduleId) {
      progressObj.modules.push({ moduleId: moduleId.toString(), completed: false, topics: [] });
      moduleIndex = progressObj.modules.length - 1;
    }
    
    if (moduleIndex !== -1 && topicId) {
      const moduleObj = progressObj.modules[moduleIndex];
      let topicIndex = moduleObj.topics.findIndex(t => t.topicId === topicId?.toString());
      if (topicIndex === -1) {
        moduleObj.topics.push({ topicId: topicId.toString(), done });
      } else {
        moduleObj.topics[topicIndex].done = done;
      }
    }
    
    // Calculate progress
    if (currentCourseModules) {
      let totalTopics = 0;
      let completedTopics = 0;
      
      currentCourseModules.forEach(m => {
        const pMod = progressObj.modules.find(pm => pm.moduleId === m.id?.toString());
        if (m.topics) {
          totalTopics += m.topics.length;
          m.topics.forEach(t => {
            const pTopic = pMod?.topics.find(pt => pt.topicId === (t.id || t.num)?.toString());
            if (pTopic?.done) completedTopics++;
          });
        } else {
          totalTopics += 4; // Mock estimate
          if (pMod?.completed) completedTopics += 4;
        }
      });
      
      progressObj.progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    }
    
    await user.save();
    return res.json({ success: true, data: progressObj });
  } catch (error) {
    next(error);
  }
};

export const downloadCourseNotes = async (req, res, next) => {
  try {
    const { id, moduleId } = req.params;
    // In a real application, fetch the actual file from S3 or local disk.
    // Here we generate a mock text file as notes.
    const notesContent = `Notes for Course ${id} - Module ${moduleId}\n\nThese are the downloaded notes...\n`;
    res.setHeader('Content-disposition', `attachment; filename=notes_course_${id}_module_${moduleId}.txt`);
    res.setHeader('Content-type', 'text/plain');
    res.send(notesContent);
  } catch (error) {
    next(error);
  }
};
