import { getStoreData, registerForContest } from '../services/store.js';

export const getContests = async (req, res, next) => {
  try {
    const store = getStoreData();
    return res.json({
      success: true,
      contests: store.contests
    });
  } catch (error) {
    next(error);
  }
};

export const registerContest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = registerForContest(id);

    return res.json({
      success: true,
      message: success ? 'Successfully registered for contest' : 'Contest not found'
    });
  } catch (error) {
    next(error);
  }
};
