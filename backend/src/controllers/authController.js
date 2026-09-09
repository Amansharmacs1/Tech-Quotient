import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getStoreData, updateStudentProfile } from '../services/store.js';

export const loginUser = async (req, res, next) => {
  try {
    const { email, password, role = 'student' } = req.body;
    const store = getStoreData();
    const user = role === 'faculty' ? store.facultyInfo : store.studentProfile;

    const token = jwt.sign(
      { id: user._id || 'user-student-1', email: user.email, role: user.role || role },
      process.env.JWT_SECRET || 'techquotient_jwt_secret_key_2026',
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      user
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentProfile = async (req, res, next) => {
  try {
    const store = getStoreData();
    return res.json({
      success: true,
      profile: store.studentProfile,
      faculty: store.facultyInfo
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updated = updateStudentProfile(req.body);
    return res.json({
      success: true,
      message: 'Profile updated successfully',
      profile: updated
    });
  } catch (error) {
    next(error);
  }
};
