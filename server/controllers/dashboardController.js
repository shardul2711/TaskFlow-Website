import dashboardService from '../services/dashboardService.js';

export const getDashboardData = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboardData(req.user._id);
    return res.status(200).json({
      success: true,
      message: 'Dashboard data retrieved successfully',
      data,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
