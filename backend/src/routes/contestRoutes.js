import express from 'express';
import { getContests, registerContest } from '../controllers/contestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getContests);
router.post('/:id/register', protect, registerContest);

export default router;
