import Course from '../models/Course.js';
import Problem from '../models/Problem.js';
import Assignment from '../models/Assignment.js';
import Student from '../models/Student.js';
import Submission from '../models/Submission.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get dashboard metrics
// @route   GET /api/analytics/dashboard
export const getDashboardAnalytics = async (req, res) => {
  try {
    const facultyId = 'faculty-123';
    const coursesCount = await Course.countDocuments({ facultyId });
    const problemsCount = await Problem.countDocuments({ facultyId });
    const assignmentsCount = await Assignment.countDocuments({ facultyId });
    const studentsCount = await Student.countDocuments(); // In real app, filter by faculty's courses

    const recentSubmissions = await Submission.find({})
      .populate('studentId', 'name')
      .populate('assignmentId', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    // Dummy chart data - in reality this would aggregate submission scores over time
    const performanceData = [
      { name: 'Week 1', score: 65, active: 40 },
      { name: 'Week 2', score: 72, active: 55 },
      { name: 'Week 3', score: 68, active: 62 },
      { name: 'Week 4', score: 85, active: 75 },
      { name: 'Week 5', score: 82, active: 80 }
    ];

    const data = {
      metrics: {
        activeCourses: coursesCount,
        totalStudents: studentsCount,
        activeAssignments: assignmentsCount,
        avgClassScore: 78 // Mocked average
      },
      recentSubmissions,
      performanceData
    };

    return sendSuccess(res, data);
  } catch (error) {
    return sendError(res, 'Unable to load dashboard analytics', 500);
  }
};

// @desc    Get full analytics report
// @route   GET /api/analytics/full
export const getFullAnalytics = async (req, res) => {
  try {
    // Return dummy data for full analytics page for now
    const data = {
      weeklyActivity: [
        { name: 'Mon', submissions: 12, questions: 4 },
        { name: 'Tue', submissions: 19, questions: 6 },
        { name: 'Wed', submissions: 15, questions: 8 },
        { name: 'Thu', submissions: 25, questions: 12 },
        { name: 'Fri', submissions: 22, questions: 15 },
        { name: 'Sat', submissions: 30, questions: 2 },
        { name: 'Sun', submissions: 35, questions: 5 },
      ],
      topicPerformance: [
        { subject: 'Arrays', A: 85, B: 60, fullMark: 100 },
        { subject: 'Strings', A: 65, B: 50, fullMark: 100 },
        { subject: 'Linked Lists', A: 45, B: 40, fullMark: 100 },
        { subject: 'Trees', A: 30, B: 20, fullMark: 100 },
        { subject: 'Dynamic Prog.', A: 20, B: 15, fullMark: 100 },
        { subject: 'Graphs', A: 25, B: 10, fullMark: 100 },
      ]
    };
    return sendSuccess(res, data);
  } catch (error) {
    return sendError(res, 'Unable to load full analytics', 500);
  }
};
