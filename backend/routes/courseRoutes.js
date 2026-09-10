import express from 'express';
import { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, requireRole('faculty', 'admin'), createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(protect, requireRole('faculty', 'admin'), updateCourse)
  .delete(protect, requireRole('faculty', 'admin'), deleteCourse);

export default router;
