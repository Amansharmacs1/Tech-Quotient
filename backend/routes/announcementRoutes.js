import express from 'express';
import { createAnnouncement, getAnnouncements, deleteAnnouncement } from '../controllers/announcementController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createAnnouncement)
  .get(protect, getAnnouncements);

router.route('/:id')
  .delete(protect, deleteAnnouncement);

export default router;
