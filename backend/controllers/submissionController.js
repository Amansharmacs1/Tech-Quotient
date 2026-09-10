import Submission from '../models/Submission.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all submissions
// @route   GET /api/submissions
export const getSubmissions = async (req, res) => {
  try {
    const { studentId, assignmentId, problemId, status } = req.query;
    
    const query = {};
    if (studentId) query.studentId = studentId;
    if (assignmentId) query.assignmentId = assignmentId;
    if (problemId) query.problemId = problemId;
    if (status) query.status = status;

    const submissions = await Submission.find(query)
      .populate('studentId', 'name rollNumber email profileImage')
      .populate('problemId', 'title')
      .populate('assignmentId', 'title')
      .sort({ createdAt: -1 });

    return sendSuccess(res, submissions);
  } catch (error) {
    return sendError(res, 'Unable to load submissions', 500);
  }
};

// @desc    Get single submission
// @route   GET /api/submissions/:id
export const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('studentId', 'name rollNumber email profileImage')
      .populate('problemId', 'title')
      .populate('assignmentId', 'title');
      
    if (!submission) return sendError(res, 'Submission not found', 404);
    
    return sendSuccess(res, submission);
  } catch (error) {
    return sendError(res, 'Unable to load submission', 500);
  }
};
