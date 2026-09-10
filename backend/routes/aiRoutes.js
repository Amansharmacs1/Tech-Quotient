import express from 'express';
import { generateProblem, generateAssignment, chat } from '../controllers/aiController.js';

const router = express.Router();

router.post('/generate-problem', generateProblem);
router.post('/generate-assignment', generateAssignment);
router.post('/chat', chat);

export default router;
