import express from 'express';
import { getStudentAnalytics } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/student', protect, getStudentAnalytics);

export default router;
