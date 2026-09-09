import { getStoreData } from '../services/store.js';

export const getProblems = async (req, res, next) => {
  try {
    const store = getStoreData();
    return res.json({
      success: true,
      problems: store.problems
    });
  } catch (error) {
    next(error);
  }
};

export const getProblemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = getStoreData();
    const problem = store.problems.find(p => p.id === id || p.customId === id);

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    return res.json({
      success: true,
      problem
    });
  } catch (error) {
    next(error);
  }
};
