import axiosInstance from './axios.js';

class DashboardService {
  async getDashboardData() {
    const response = await axiosInstance.get('/dashboard');
    return response.data;
  }
}

export default new DashboardService();
