import express from 'express';
import { getNotifications, markRead, clearAll } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getNotifications);
router.patch('/:id/read', protect, markRead);
router.delete('/', protect, clearAll);

export default router;
