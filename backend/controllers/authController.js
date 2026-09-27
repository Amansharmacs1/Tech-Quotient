import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.js';
import OTP from '../models/OTP.js';
import { sendOTPEmail } from '../services/emailService.js';
import { generateOTP } from '../utils/generateOTP.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

const ALLOWED_FACULTY_EMAILS = [
  'amansharmacs11@gmail.com',
  'ansh1092.be24@chitkarauniversity.edu.in'
];

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'techquotient_jwt_secret_key_2026',
    { expiresIn: '7d' }
  );
};

// @desc    Send Signup OTP
// @route   POST /api/auth/signup/send-otp
export const signupSendOTP = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return sendError(res, 'Please provide all fields', 400);
    }
    const cleanEmail = email.trim().toLowerCase();

    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists && userExists.isVerified) {
      return sendError(res, 'An account with this email already exists', 400);
    }

    // Generate and Hash OTP
    const otp = generateOTP();
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    // Invalidate old OTPs for signup
    await OTP.deleteMany({ email: cleanEmail, purpose: 'signup' });

    await OTP.create({
      email: cleanEmail,
      otpHash,
      purpose: 'signup',
      expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 mins
    });

    await sendOTPEmail(cleanEmail, name, otp);

    return res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Signup OTP & Create Account
// @route   POST /api/auth/signup/verify-otp
export const signupVerifyOTP = async (req, res, next) => {
  try {
    const { name, email, password, otp } = req.body;
    const cleanEmailForRole = email.trim().toLowerCase();
    const role = ALLOWED_FACULTY_EMAILS.includes(cleanEmailForRole) ? 'faculty' : 'student';
    const cleanEmail = email.trim().toLowerCase();

    const otpRecord = await OTP.findOne({ email: cleanEmail, purpose: 'signup' });
    if (!otpRecord) return sendError(res, 'OTP expired or invalid. Please request a new one.', 400);
    if (new Date() > otpRecord.expiresAt) return sendError(res, 'OTP has expired', 400);

    const isMatch = await bcrypt.compare(otp, otpRecord.otpHash);
    if (!isMatch) {
      otpRecord.attempts += 1;
      if (otpRecord.attempts >= 5) {
        await OTP.deleteOne({ _id: otpRecord._id });
        return sendError(res, 'Too many failed attempts. OTP invalidated.', 400);
      }
      await otpRecord.save();
      return sendError(res, 'Invalid verification code', 400);
    }

    // OTP matched, create user
    await OTP.deleteOne({ _id: otpRecord._id }); // Invalidate OTP

    // Delete unverified user if exists
    await User.deleteOne({ email: cleanEmail, isVerified: false });

    const newUser = await User.create({
      name,
      email: cleanEmail,
      password, // Pre-save hook will hash it
      role,
      isVerified: true,
      department: 'Computer Science & Engineering',
      institution: 'Chitkara University',
      title: role === 'faculty' ? 'Assistant Professor' : undefined
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      data: { token, user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login
// @route   POST /api/auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return sendError(res, 'Please provide email and password', 400);

    const cleanEmail = email.trim().toLowerCase();
    const dbUser = await User.findOne({ email: cleanEmail });

    if (!dbUser) return sendError(res, 'Invalid credentials', 401);
    if (!dbUser.isVerified) return sendError(res, 'Please verify your email before signing in.', 401);
    

    const isMatch = await dbUser.matchPassword(password);
    if (!isMatch) return sendError(res, 'Invalid credentials', 401);

    const token = generateToken(dbUser);

    return res.json({
      success: true,
      token,
      user: { id: dbUser._id, name: dbUser.name, email: dbUser.email, role: dbUser.role },
      data: { token, user: { id: dbUser._id, name: dbUser.name, email: dbUser.email, role: dbUser.role } }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password Send OTP
// @route   POST /api/auth/forgot-password/send-otp
export const forgotPasswordSendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const cleanEmail = email.trim().toLowerCase();

    const userExists = await User.findOne({ email: cleanEmail });
    if (!userExists) {
      // For security, don't reveal user doesn't exist explicitly if preferred, but for UX we can.
      return sendError(res, 'Account not found', 404);
    }

    const otp = generateOTP();
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    await OTP.deleteMany({ email: cleanEmail, purpose: 'password_reset' });
    await OTP.create({
      email: cleanEmail,
      otpHash,
      purpose: 'password_reset',
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    await sendOTPEmail(cleanEmail, userExists.name, otp);

    return res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password Verify OTP
// @route   POST /api/auth/forgot-password/verify-otp
export const forgotPasswordVerifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const cleanEmail = email.trim().toLowerCase();

    const otpRecord = await OTP.findOne({ email: cleanEmail, purpose: 'password_reset' });
    if (!otpRecord) return sendError(res, 'OTP expired or invalid.', 400);
    if (new Date() > otpRecord.expiresAt) return sendError(res, 'OTP has expired', 400);

    const isMatch = await bcrypt.compare(otp, otpRecord.otpHash);
    if (!isMatch) {
      otpRecord.attempts += 1;
      if (otpRecord.attempts >= 5) {
        await OTP.deleteOne({ _id: otpRecord._id });
        return sendError(res, 'Too many failed attempts. OTP invalidated.', 400);
      }
      await otpRecord.save();
      return sendError(res, 'Invalid verification code', 400);
    }

    await OTP.deleteOne({ _id: otpRecord._id });

    // Generate a temporary reset token (valid for 15 mins)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Store it in the user's document
    await User.updateOne({ email: cleanEmail }, { 
      $set: { 
        resetPasswordToken: resetTokenHash, 
        resetPasswordExpire: new Date(Date.now() + 15 * 60 * 1000) 
      } 
    });

    return res.json({ success: true, resetToken, email: cleanEmail });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
export const resetPassword = async (req, res, next) => {
  try {
    const { email, resetToken, password } = req.body;
    const cleanEmail = email.trim().toLowerCase();

    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
      email: cleanEmail,
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return sendError(res, 'Invalid or expired reset token', 400);

    user.password = password; // Pre-save hook hashes it
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
};

// Compatibility endpoint
export const getProfile = async (req, res, next) => {
  try {
    const dbUser = await User.findById(req.user?.id || req.user?._id).select('-password');
    if (!dbUser) return sendError(res, 'User not found', 404);
    return res.json({ success: true, user: dbUser, data: dbUser });
  } catch (error) {
    next(error);
  }
};
