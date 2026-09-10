import Problem from '../models/Problem.js';
import Course from '../models/Course.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all problems
// @route   GET /api/problems
export const getProblems = async (req, res) => {
  try {
    const { course, topic, difficulty, status, search } = req.query;
    
    const query = { facultyId: 'faculty-123' };
    
    if (course) {
      // Find courseId by courseName or Code if necessary, or assume it's passed as ID
      // To be safe, if length is 24, assume ObjectId, else regex search in courses
      if (course.length === 24) {
        query.courseId = course;
      } else {
        const c = await Course.findOne({ courseName: new RegExp(course, 'i') });
        if (c) query.courseId = c._id;
      }
    }
    
    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;
    if (status) query.status = status;
    if (search) query.title = { $regex: search, $options: 'i' };

    const problems = await Problem.find(query)
      .populate('courseId', 'courseName courseCode')
      .sort({ createdAt: -1 });

    return sendSuccess(res, problems);
  } catch (error) {
    return sendError(res, 'Unable to load problems', 500);
  }
};

// @desc    Get single problem
// @route   GET /api/problems/:id
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).populate('courseId', 'courseName');
    if (!problem) return sendError(res, 'Problem not found', 404);
    
    if (problem.facultyId !== 'faculty-123') return sendError(res, 'Unauthorized', 403);
    
    return sendSuccess(res, problem);
  } catch (error) {
    return sendError(res, 'Unable to load problem', 500);
  }
};

// @desc    Create problem
// @route   POST /api/problems
export const createProblem = async (req, res) => {
  try {
    const newProblem = await Problem.create({
      ...req.body,
      facultyId: 'faculty-123'
    });
    return sendSuccess(res, newProblem, 201);
  } catch (error) {
    return sendError(res, error.message || 'Unable to create problem', 400);
  }
};

// @desc    Update problem
// @route   PUT /api/problems/:id
export const updateProblem = async (req, res) => {
  try {
    let problem = await Problem.findById(req.params.id);
    if (!problem) return sendError(res, 'Problem not found', 404);
    
    if (problem.facultyId !== 'faculty-123') return sendError(res, 'Unauthorized', 403);

    problem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return sendSuccess(res, problem);
  } catch (error) {
    return sendError(res, error.message || 'Unable to update problem', 400);
  }
};

// @desc    Delete problem
// @route   DELETE /api/problems/:id
export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return sendError(res, 'Problem not found', 404);
    
    if (problem.facultyId !== 'faculty-123') return sendError(res, 'Unauthorized', 403);

    await problem.deleteOne();
    return sendSuccess(res, { message: 'Problem deleted successfully' });
  } catch (error) {
    return sendError(res, 'Unable to delete problem', 500);
  }
};
