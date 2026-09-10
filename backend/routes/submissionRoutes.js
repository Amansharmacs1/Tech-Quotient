import express from 'express';
import { getSubmissions, getSubmissionById } from '../controllers/submissionController.js';

const router = express.Router();

router.route('/')
  .get(getSubmissions);

router.route('/:id')
  .get(getSubmissionById);

export default router;
