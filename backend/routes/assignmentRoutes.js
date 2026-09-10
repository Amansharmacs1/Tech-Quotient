import express from 'express';
import { 
  getAssignments, 
  getAssignmentById, 
  createAssignment, 
  updateAssignment, 
  deleteAssignment, 
  submitAssignmentSolution 
} from '../controllers/assignmentController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAssignments)
  .post(protect, requireRole('faculty', 'admin'), createAssignment);

router.route('/:id')
  .get(getAssignmentById)
  .put(protect, requireRole('faculty', 'admin'), updateAssignment)
  .delete(protect, requireRole('faculty', 'admin'), deleteAssignment);

router.post('/:id/submit', protect, submitAssignmentSolution);

export default router;
