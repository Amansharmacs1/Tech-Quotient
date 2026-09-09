import express from 'express';
import { loginUser, getStudentProfile, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/profile', protect, getStudentProfile);
router.put('/profile', protect, updateProfile);

export default router;
