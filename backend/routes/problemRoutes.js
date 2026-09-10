import express from 'express';
import { getProblems, getProblemById, createProblem, updateProblem, deleteProblem } from '../controllers/problemController.js';

const router = express.Router();

router.route('/')
  .get(getProblems)
  .post(createProblem);

router.route('/:id')
  .get(getProblemById)
  .put(updateProblem)
  .delete(deleteProblem);

export default router;
