import Student from '../models/Student.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all students (for the faculty's courses)
// @route   GET /api/students
export const getStudents = async (req, res) => {
  try {
    const { courseId, status, search } = req.query;
    
    // In a real app we'd filter students enrolled in courses taught by faculty-123.
    // For now, return all or filter.
    const query = {};
    if (courseId) query.enrolledCourses = courseId;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const students = await Student.find(query)
      .populate('enrolledCourses', 'courseName')
      .sort({ createdAt: -1 });

    return sendSuccess(res, students);
  } catch (error) {
    console.error('getStudents Error:', error);
    return sendError(res, 'Unable to load students', 500);
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('enrolledCourses', 'courseName');
      
    if (!student) return sendError(res, 'Student not found', 404);
    
    return sendSuccess(res, student);
  } catch (error) {
    return sendError(res, 'Unable to load student', 500);
  }
};
