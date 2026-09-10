import Contest from '../models/Contest.js';
import { getStoreData, registerForContest } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all coding contests
// @route   GET /api/contests
export const getContests = async (req, res, next) => {
  try {
    try {
      const contests = await Contest.find().sort({ createdAt: -1 });
      if (contests && contests.length > 0) {
        return res.json({
          success: true,
          data: contests,
          contests
        });
      }
    } catch (dbErr) {}

    const contests = getStoreData().contests;
    return res.json({
      success: true,
      data: contests,
      contests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contest by ID
// @route   GET /api/contests/:id
export const getContestById = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      let contest = null;
      if (id.length === 24) contest = await Contest.findById(id);
      if (!contest) contest = await Contest.findOne({ customId: id });
      if (contest) {
        return res.json({
          success: true,
          data: contest,
          contest
        });
      }
    } catch (dbErr) {}

    const store = getStoreData();
    const contest = store.contests.find(c => c.id === id || c._id === id || c.customId === id);

    if (!contest) return sendError(res, 'Contest not found', 404);

    return res.json({
      success: true,
      data: contest,
      contest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register current student for a contest
// @route   POST /api/contests/:id/register
export const registerContest = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      await Contest.findOneAndUpdate(
        { $or: [{ _id: id.length === 24 ? id : null }, { customId: id }] },
        { $inc: { participants: 1 } }
      );
    } catch (dbErr) {}

    registerForContest(id);

    return res.json({
      success: true,
      message: 'Successfully registered for contest!'
    });
  } catch (error) {
    next(error);
  }
};
