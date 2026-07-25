import axiosInstance from './axios.js';

class TaskService {
  async getTasks(params) {
    const response = await axiosInstance.get('/tasks', { params });
    return response.data;
  }

  async getTaskById(id) {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
  }

  async createTask(taskData) {
    const response = await axiosInstance.post('/tasks', taskData);
    return response.data;
  }

  async updateTask(id, taskData) {
    const response = await axiosInstance.put(`/tasks/${id}`, taskData);
    return response.data;
  }

  async deleteTask(id) {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  }

  async duplicateTask(id) {
    const response = await axiosInstance.post(`/tasks/${id}/duplicate`);
    return response.data;
  }

  async archiveTask(id) {
    const response = await axiosInstance.put(`/tasks/${id}/archive`);
    return response.data;
  }

  async restoreTask(id) {
    const response = await axiosInstance.put(`/tasks/${id}/restore`);
    return response.data;
  }

  async uploadAttachment(file, onUploadProgress) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return response.data;
  }
}

export default new TaskService();
