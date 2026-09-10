import express from 'express';
import { getProblems, getProblemById, createProblem, updateProblem, deleteProblem } from '../controllers/problemController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProblems)
  .post(protect, requireRole('faculty', 'admin'), createProblem);

router.route('/:id')
  .get(getProblemById)
  .put(protect, requireRole('faculty', 'admin'), updateProblem)
  .delete(protect, requireRole('faculty', 'admin'), deleteProblem);

export default router;
