import Course from '../models/Course.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all courses
// @route   GET /api/courses
export const getCourses = async (req, res) => {
  try {
    const { status, search } = req.query;
    
    // Build query
    const query = { facultyId: 'faculty-123' }; // Hardcoded for Phase 8 auth boundary
    
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { courseName: { $regex: search, $options: 'i' } },
        { courseCode: { $regex: search, $options: 'i' } }
      ];
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });
    return sendSuccess(res, courses);
  } catch (error) {
    return sendError(res, 'Unable to load courses', 500);
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return sendError(res, 'Course not found', 404);
    
    // Auth boundary check
    if (course.facultyId !== 'faculty-123') return sendError(res, 'Unauthorized', 403);
    
    return sendSuccess(res, course);
  } catch (error) {
    return sendError(res, 'Unable to load course', 500);
  }
};

// @desc    Create a course
// @route   POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create({
      ...req.body,
      facultyId: 'faculty-123'
    });
    return sendSuccess(res, newCourse, 201);
  } catch (error) {
    return sendError(res, error.message || 'Unable to create course', 400);
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
export const updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    if (!course) return sendError(res, 'Course not found', 404);
    
    if (course.facultyId !== 'faculty-123') return sendError(res, 'Unauthorized', 403);

    course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return sendSuccess(res, course);
  } catch (error) {
    return sendError(res, error.message || 'Unable to update course', 400);
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return sendError(res, 'Course not found', 404);
    
    if (course.facultyId !== 'faculty-123') return sendError(res, 'Unauthorized', 403);

    await course.deleteOne();
    return sendSuccess(res, { message: 'Course deleted successfully' });
  } catch (error) {
    return sendError(res, 'Unable to delete course', 500);
  }
};
