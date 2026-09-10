import express from 'express';
import { 
  getNotifications, 
  markAsRead, 
  createAnnouncement 
} from '../controllers/notificationController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getNotifications);
router.post('/read', protect, markAsRead);
router.post('/announcement', protect, requireRole('faculty', 'admin'), createAnnouncement);

export default router;
