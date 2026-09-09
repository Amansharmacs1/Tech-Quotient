import express from 'express';
import { getProblems, getProblemById } from '../controllers/problemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getProblems);
router.get('/:id', protect, getProblemById);

export default router;
