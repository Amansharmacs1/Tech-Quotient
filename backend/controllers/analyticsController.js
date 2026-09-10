import Course from '../models/Course.js';
import Problem from '../models/Problem.js';
import Assignment from '../models/Assignment.js';
import Student from '../models/Student.js';
import Submission from '../models/Submission.js';
import { getStoreData } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get faculty dashboard metrics & charts
// @route   GET /api/analytics/dashboard
export const getDashboardAnalytics = async (req, res, next) => {
  try {
    let coursesCount = 3;
    let problemsCount = 12;
    let assignmentsCount = 3;
    let studentsCount = 4;
    let recentSubmissions = [];

    try {
      coursesCount = await Course.countDocuments();
      problemsCount = await Problem.countDocuments();
      assignmentsCount = await Assignment.countDocuments();
      studentsCount = await Student.countDocuments();

      recentSubmissions = await Submission.find({})
        .populate('studentId', 'name email')
        .populate('assignmentId', 'title')
        .sort({ createdAt: -1 })
        .limit(5);
    } catch (err) {}

    if (!recentSubmissions || recentSubmissions.length === 0) {
      recentSubmissions = getStoreData().submissions.slice(0, 5);
    }

    const performanceData = [
      { name: 'Week 1', score: 65, active: 40 },
      { name: 'Week 2', score: 72, active: 55 },
      { name: 'Week 3', score: 68, active: 62 },
      { name: 'Week 4', score: 85, active: 75 },
      { name: 'Week 5', score: 88, active: 84 }
    ];

    const data = {
      metrics: {
        activeCourses: coursesCount || 3,
        totalStudents: studentsCount || 4,
        activeAssignments: assignmentsCount || 3,
        avgClassScore: 82
      },
      recentSubmissions,
      performanceData
    };

    return sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
};

// @desc    Get faculty full analytics & topic breakdown
// @route   GET /api/analytics/full
export const getFullAnalytics = async (req, res, next) => {
  try {
    const data = {
      weeklyActivity: [
        { name: 'Mon', submissions: 18, questions: 6 },
        { name: 'Tue', submissions: 24, questions: 8 },
        { name: 'Wed', submissions: 22, questions: 10 },
        { name: 'Thu', submissions: 35, questions: 14 },
        { name: 'Fri', submissions: 42, questions: 18 },
        { name: 'Sat', submissions: 50, questions: 22 },
        { name: 'Sun', submissions: 38, questions: 12 },
      ],
      topicPerformance: [
        { subject: 'Arrays & Hashing', A: 92, B: 85, fullMark: 100 },
        { subject: 'Strings', A: 88, B: 80, fullMark: 100 },
        { subject: 'Linked Lists', A: 78, B: 72, fullMark: 100 },
        { subject: 'Binary Trees & AVL', A: 68, B: 60, fullMark: 100 },
        { subject: 'Dynamic Programming', A: 48, B: 42, fullMark: 100 },
        { subject: 'Graphs', A: 55, B: 50, fullMark: 100 },
      ]
    };

    return sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
};

// @desc    Get student performance analytics & progress
// @route   GET /api/analytics/student
export const getStudentAnalytics = async (req, res, next) => {
  try {
    const store = getStoreData();
    const profile = store.studentProfile;

    const topicPerformance = [
      { topic: "Arrays & Hashing", count: 45, label: "45 solved (92% acc)" },
      { topic: "Strings", count: 38, label: "38 solved (88% acc)" },
      { topic: "Binary Trees & AVL", count: 28, label: "28 solved (75% acc)" },
      { topic: "Graphs & BFS/DFS", count: 19, label: "19 solved (68% acc)" },
      { topic: "Dynamic Programming", count: 12, label: "12 solved (42% acc)" }
    ];

    const accuracyTrends = [
      { week: "Week 1", value: 75 },
      { week: "Week 2", value: 80 },
      { week: "Week 3", value: 84 },
      { week: "Week 4", value: 88.5 }
    ];

    const difficultyBreakdown = {
      easy: { solved: 82, total: 90, percent: 91 },
      medium: { solved: 48, total: 110, percent: 43.6 },
      hard: { solved: 12, total: 50, percent: 24 }
    };

    return res.json({
      success: true,
      profile,
      topicPerformance,
      accuracyTrends,
      difficultyBreakdown
    });
  } catch (error) {
    next(error);
  }
};
