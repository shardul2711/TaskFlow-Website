import axiosInstance from './axios.js';

class AuthService {
  async register(name, email, password) {
    const response = await axiosInstance.post('/auth/register', { name, email, password });
    return response.data;
  }

  async login(email, password) {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  }

  async logout() {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  }

  async getMe() {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  }

  async updateProfile(userData) {
    const response = await axiosInstance.put('/auth/profile', userData);
    return response.data;
  }

  async changePassword(currentPassword, newPassword) {
    const response = await axiosInstance.put('/auth/change-password', { currentPassword, newPassword });
    return response.data;
  }

  async getAllUsers() {
    const response = await axiosInstance.get('/auth/users');
    return response.data;
  }
}

export default new AuthService();
