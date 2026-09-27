import express from 'express';
import { 
  loginUser, 
  signupSendOTP, 
  signupVerifyOTP, 
  forgotPasswordSendOTP, 
  forgotPasswordVerifyOTP, 
  resetPassword, 
  getProfile 
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup/send-otp', signupSendOTP);
router.post('/signup/verify-otp', signupVerifyOTP);
router.post('/forgot-password/send-otp', forgotPasswordSendOTP);
router.post('/forgot-password/verify-otp', forgotPasswordVerifyOTP);
router.post('/reset-password', resetPassword);

router.get('/profile', protect, getProfile);

export default router;
