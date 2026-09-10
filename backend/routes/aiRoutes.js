import express from 'express';
import { handleAiChat, generateProblem, generateAssignment } from '../controllers/aiController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/chat', handleAiChat);
router.post('/generate-problem', protect, requireRole('faculty', 'admin'), generateProblem);
router.post('/generate-assignment', protect, requireRole('faculty', 'admin'), generateAssignment);

export default router;
