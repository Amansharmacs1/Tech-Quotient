import express from 'express';
import { getContests, getContestById, registerContest } from '../controllers/contestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getContests);
router.get('/:id', getContestById);
router.post('/:id/register', protect, registerContest);

export default router;
