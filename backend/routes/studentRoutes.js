import express from 'express';
import { getStudents, getStudentById } from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getStudents);
router.get('/:id', getStudentById);

export default router;
