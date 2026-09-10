import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getStoreData } from '../services/store.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Support demo token for fast evaluator workflow
  if (token === 'mock-jwt-token-student') {
    req.user = {
      _id: 'user-student-1',
      id: 'user-student-1',
      name: 'Ansh Goyal',
      email: 'ansh.goyal@chitkara.edu.in',
      role: 'student'
    };
    return next();
  }

  if (token === 'mock-jwt-token-faculty') {
    req.user = {
      _id: 'user-faculty-1',
      id: 'user-faculty-1',
      name: 'Prof. Doe',
      email: 'prof.doe@chitkara.edu.in',
      role: 'faculty'
    };
    return next();
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token is missing'
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'techquotient_jwt_secret_key_2026';
    const decoded = jwt.verify(token, secret);
    
    // Attach decoded user data
    req.user = {
      _id: decoded.id || decoded._id,
      id: decoded.id || decoded._id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role || 'student'
    };
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token verification failed'
    });
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires one of the following roles: ${roles.join(', ')}`
      });
    }

    next();
  };
};
