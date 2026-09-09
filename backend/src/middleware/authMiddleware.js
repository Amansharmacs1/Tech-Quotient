import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // For development ease, if token is missing or 'mock-jwt-token-student', allow student access
  if (!token || token === 'mock-jwt-token-student') {
    req.user = {
      id: 'user-student-1',
      name: 'Ansh Goyal',
      email: 'ansh.goyal@chitkara.edu.in',
      role: 'student'
    };
    return next();
  }

  try {
    const secret = process.env.JWT_SECRET || 'techquotient_jwt_secret_key_2026';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, token verification failed' });
  }
};

export const requireRole = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    next();
  } else {
    res.status(403).json({ success: false, message: `Access denied. Requires ${role} role.` });
  }
};
