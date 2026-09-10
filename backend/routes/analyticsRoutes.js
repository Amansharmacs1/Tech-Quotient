import express from 'express';
import { getDashboardAnalytics, getFullAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

router.route('/dashboard')
  .get(getDashboardAnalytics);

router.route('/full')
  .get(getFullAnalytics);

export default router;
