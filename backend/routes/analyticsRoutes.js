import express from 'express';
import { 
  getDashboardAnalytics, 
  getFullAnalytics, 
  getStudentAnalytics 
} from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', getDashboardAnalytics);
router.get('/full', getFullAnalytics);
router.get('/student', protect, getStudentAnalytics);

export default router;
