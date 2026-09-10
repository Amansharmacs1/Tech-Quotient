import Problem from '../models/Problem.js';
import { getStoreData, addProblem, updateProblem as storeUpdateProblem, deleteProblem as storeDeleteProblem } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all problems
// @route   GET /api/problems
export const getProblems = async (req, res, next) => {
  try {
    const { course, topic, difficulty, status, search } = req.query;

    try {
      const query = {};
      if (topic) query.$or = [{ topic }, { category: topic }];
      if (difficulty) query.difficulty = difficulty;
      if (status) query.status = status;
      if (search) query.title = { $regex: search, $options: 'i' };

      const problems = await Problem.find(query).populate('courseId', 'courseName courseCode').sort({ createdAt: -1 });
      if (problems && problems.length > 0) {
        return res.json({
          success: true,
          data: problems,
          problems
        });
      }
    } catch (dbErr) {}

    let problems = getStoreData().problems;
    if (topic) {
      problems = problems.filter(p => (p.topic === topic || p.category === topic));
    }
    if (difficulty) {
      problems = problems.filter(p => p.difficulty?.toLowerCase() === difficulty.toLowerCase());
    }
    if (search) {
      const s = search.toLowerCase();
      problems = problems.filter(p => p.title?.toLowerCase().includes(s));
    }

    return res.json({
      success: true,
      data: problems,
      problems
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single problem
// @route   GET /api/problems/:id
export const getProblemById = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      let problem = null;
      if (id.length === 24) {
        problem = await Problem.findById(id).populate('courseId', 'courseName courseCode');
      }
      if (!problem) {
        problem = await Problem.findOne({ customId: id }).populate('courseId', 'courseName courseCode');
      }
      if (problem) {
        return res.json({
          success: true,
          data: problem,
          problem
        });
      }
    } catch (dbErr) {}

    const store = getStoreData();
    const problem = store.problems.find(p => p.id === id || p._id === id || p.customId === id);

    if (!problem) {
      return sendError(res, 'Problem not found', 404);
    }

    return res.json({
      success: true,
      data: problem,
      problem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a problem (Faculty only)
// @route   POST /api/problems
export const createProblem = async (req, res, next) => {
  try {
    const facultyId = req.user?.id || req.user?._id || 'user-faculty-1';

    try {
      const newProblem = await Problem.create({
        ...req.body,
        facultyId
      });

      return res.status(201).json({
        success: true,
        data: newProblem,
        problem: newProblem
      });
    } catch (dbErr) {
      const newProblem = addProblem({
        ...req.body,
        facultyId
      });

      return res.status(201).json({
        success: true,
        data: newProblem,
        problem: newProblem
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update a problem (Faculty only)
// @route   PUT /api/problems/:id
export const updateProblem = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const updated = await Problem.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (updated) {
        return res.json({
          success: true,
          data: updated,
          problem: updated
        });
      }
    } catch (dbErr) {}

    const updated = storeUpdateProblem(id, req.body);
    if (!updated) return sendError(res, 'Problem not found', 404);

    return res.json({
      success: true,
      data: updated,
      problem: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a problem (Faculty only)
// @route   DELETE /api/problems/:id
export const deleteProblem = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const deleted = await Problem.findByIdAndDelete(id);
      if (deleted) return sendSuccess(res, { message: 'Problem deleted successfully' });
    } catch (dbErr) {}

    storeDeleteProblem(id);
    return sendSuccess(res, { message: 'Problem deleted successfully' });
  } catch (error) {
    next(error);
  }
};
