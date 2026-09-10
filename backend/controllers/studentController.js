import Student from '../models/Student.js';
import User from '../models/User.js';
import { getStoreData } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all students (for faculty portal)
// @route   GET /api/students
export const getStudents = async (req, res, next) => {
  try {
    const { courseId, search } = req.query;

    try {
      const query = {};
      if (courseId) query.enrolledCourses = courseId;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { rollNumber: { $regex: search, $options: 'i' } }
        ];
      }

      const students = await Student.find(query)
        .populate('enrolledCourses', 'courseName courseCode')
        .sort({ createdAt: -1 });

      if (students && students.length > 0) {
        return res.json({
          success: true,
          data: students,
          students
        });
      }
    } catch (dbErr) {}

    let students = getStoreData().students;
    if (search) {
      const s = search.toLowerCase();
      students = students.filter(st => 
        st.name?.toLowerCase().includes(s) ||
        st.email?.toLowerCase().includes(s) ||
        st.rollNumber?.toLowerCase().includes(s)
      );
    }

    return res.json({
      success: true,
      data: students,
      students
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single student details
// @route   GET /api/students/:id
export const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const student = await Student.findById(id).populate('enrolledCourses', 'courseName courseCode');
      if (student) {
        return res.json({
          success: true,
          data: student,
          student
        });
      }
    } catch (dbErr) {}

    const store = getStoreData();
    const student = store.students.find(s => s._id === id || s.id === id || s.studentId === id);

    if (!student) return sendError(res, 'Student not found', 404);

    return res.json({
      success: true,
      data: student,
      student
    });
  } catch (error) {
    next(error);
  }
};
