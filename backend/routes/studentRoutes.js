import express from 'express';
import { getStudents, getStudentById } from '../controllers/studentController.js';

const router = express.Router();

router.route('/')
  .get(getStudents);

router.route('/:id')
  .get(getStudentById);

export default router;
