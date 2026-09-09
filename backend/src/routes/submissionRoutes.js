import express from 'express';
import { runCode, submitCode, getSubmissionHistory } from '../controllers/submissionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/run', protect, runCode);
router.post('/submit', protect, submitCode);
router.get('/history', protect, getSubmissionHistory);

export default router;
