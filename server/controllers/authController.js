import authService from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    
    // Optional remember me cookie
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: result,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
      data: null,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const userProfile = await authService.getProfile(req.user._id);
    return res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      data: {
        user: {
          id: userProfile._id,
          name: userProfile.name,
          email: userProfile.email,
          avatar: userProfile.avatar,
          createdAt: userProfile.createdAt,
        },
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await authService.updateProfile(req.user._id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updatedUser },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user._id, currentPassword, newPassword);
    return res.status(200).json({
      success: true,
      message: result.message,
      data: null,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await authService.getAllUsers();
    return res.status(200).json({
      success: true,
      message: 'Users list retrieved successfully',
      data: { users },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
