import express from 'express';
import { getAssignments, submitAssignmentSolution } from '../controllers/assignmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAssignments);
router.post('/:id/submit', protect, submitAssignmentSolution);

export default router;
