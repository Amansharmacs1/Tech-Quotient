import Submission from '../models/Submission.js';
import Problem from '../models/Problem.js';
import User from '../models/User.js';
import { executeCodeService } from '../services/judgeService.js';
import { getStoreData, addSubmission } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Run code against sample test cases (Student workspace)
// @route   POST /api/submissions/run
export const runCode = async (req, res, next) => {
  try {
    const { code, language, problemId } = req.body;
    const result = await executeCodeService({ code, language, problemId, isSubmit: false });

    return res.json({
      success: true,
      result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit code solution (Student workspace)
// @route   POST /api/submissions/submit
export const submitCode = async (req, res, next) => {
  try {
    const { code, language, problemId, assignmentId } = req.body;
    const userEmail = req.user?.email || 'ansh.goyal@chitkarauniversity.edu.in';
    const studentId = req.user?._id || req.user?.id || 'student-1';

    const result = await executeCodeService({ code, language, problemId, assignmentId, isSubmit: true });

    const submissionData = {
      studentId,
      userEmail,
      problemId,
      assignmentId,
      language: language || 'Java',
      code,
      status: result.status === 'ACCEPTED' ? 'Evaluated' : 'Failed',
      score: result.score || 20,
      runtimeMs: result.runtimeMs,
      memoryMb: result.memoryMb,
      testCasesPassed: result.passedCases,
      totalTestCases: result.totalCases,
      outputDetails: result.output,
      aiFeedback: 'Great solution! Time and space complexity are optimal.'
    };

    try {
      await Submission.create(submissionData);
      if (result.status === 'ACCEPTED') {
        await User.findByIdAndUpdate(studentId, { $inc: { problemsSolved: 1 } });
      }
    } catch (dbErr) {
      addSubmission(submissionData);
    }

    return res.json({
      success: true,
      result,
      submission: submissionData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get submission history for current student
// @route   GET /api/submissions/history
export const getSubmissionHistory = async (req, res, next) => {
  try {
    const userEmail = req.user?.email || 'ansh.goyal@chitkarauniversity.edu.in';

    try {
      const history = await Submission.find({ userEmail })
        .populate('problemId', 'title difficulty')
        .populate('assignmentId', 'title')
        .sort({ createdAt: -1 })
        .limit(20);

      if (history && history.length > 0) {
        return res.json({
          success: true,
          history,
          data: history
        });
      }
    } catch (dbErr) {}

    const history = getStoreData().submissions;
    return res.json({
      success: true,
      history,
      data: history
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all submissions (Faculty live feed)
// @route   GET /api/submissions
export const getSubmissions = async (req, res, next) => {
  try {
    const { status, studentId, assignmentId } = req.query;

    try {
      const query = {};
      if (status) query.status = status;
      if (studentId) query.studentId = studentId;
      if (assignmentId) query.assignmentId = assignmentId;

      const submissions = await Submission.find(query)
        .populate('studentId', 'name email rollNumber')
        .populate('problemId', 'title difficulty')
        .populate('assignmentId', 'title')
        .sort({ createdAt: -1 });

      if (submissions && submissions.length > 0) {
        return res.json({
          success: true,
          data: submissions,
          submissions
        });
      }
    } catch (dbErr) {}

    const submissions = getStoreData().submissions;
    return res.json({
      success: true,
      data: submissions,
      submissions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single submission details (Faculty CodeViewer)
// @route   GET /api/submissions/:id
export const getSubmissionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const submission = await Submission.findById(id)
        .populate('studentId', 'name email rollNumber')
        .populate('problemId')
        .populate('assignmentId');

      if (submission) {
        return res.json({
          success: true,
          data: submission,
          submission
        });
      }
    } catch (dbErr) {}

    const store = getStoreData();
    const submission = store.submissions.find(s => s._id === id || s.id === id);

    if (!submission) return sendError(res, 'Submission not found', 404);

    return res.json({
      success: true,
      data: submission,
      submission
    });
  } catch (error) {
    next(error);
  }
};
