import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Read token from Authorization header or cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token is missing',
      data: null,
      error: 'Unauthorized access',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user and attach to the request, excluding the password field
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, user not found',
        data: null,
        error: 'Unauthorized access',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(`Auth Middleware Error: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token verification failed',
      data: null,
      error: 'Unauthorized access',
    });
  }
};
