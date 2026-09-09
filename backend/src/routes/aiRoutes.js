import express from 'express';
import { handleAiChat } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/chat', protect, handleAiChat);

export default router;
