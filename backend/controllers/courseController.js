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

      const courses = await Course.find(query).sort({ createdAt: -1 });
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
