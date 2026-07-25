import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  taskStart,
  taskFailure,
  setTasksSuccess,
  setDashboardStatsSuccess,
  addTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  setFilters,
  setViewMode,
} from '../store/features/taskSlice.js';
import taskService from '../services/taskService.js';
import dashboardService from '../services/dashboardService.js';

export const useTasks = () => {
  const dispatch = useDispatch();
  const taskState = useSelector((state) => state.tasks);

  const fetchTasks = useCallback(async (customParams = {}) => {
    dispatch(taskStart());
    try {
      const activeFilters = {
        status: taskState.filters.status,
        priority: taskState.filters.priority,
        sortBy: taskState.filters.sortBy,
        page: taskState.filters.page,
        search: taskState.filters.search,
        archived: taskState.filters.archived,
        ...customParams,
      };

      // Strip empty values before sending
      const params = {};
      Object.keys(activeFilters).forEach((key) => {
        if (activeFilters[key] !== '' && activeFilters[key] !== null && activeFilters[key] !== undefined) {
          params[key] = activeFilters[key];
        }
      });

      const response = await taskService.getTasks(params);
      dispatch(setTasksSuccess({
        tasks: response.data.tasks,
        pagination: response.data.pagination,
      }));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch tasks';
      dispatch(taskFailure(message));
      throw new Error(message);
    }
  }, [dispatch, taskState.filters]);

  const fetchDashboard = useCallback(async () => {
    dispatch(taskStart());
    try {
      const response = await dashboardService.getDashboardData();
      dispatch(setDashboardStatsSuccess(response.data));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch dashboard data';
      dispatch(taskFailure(message));
      throw new Error(message);
    }
  }, [dispatch]);

  const createTask = useCallback(async (taskData) => {
    dispatch(taskStart());
    try {
      const response = await taskService.createTask(taskData);
      dispatch(addTaskSuccess(response.data.task));
      return response.data.task;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to create task';
      dispatch(taskFailure(message));
      throw new Error(message);
    }
  }, [dispatch]);

  const updateTask = useCallback(async (id, taskData) => {
    dispatch(taskStart());
    try {
      const response = await taskService.updateTask(id, taskData);
      dispatch(updateTaskSuccess(response.data.task));
      return response.data.task;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update task';
      dispatch(taskFailure(message));
      throw new Error(message);
    }
  }, [dispatch]);

  const deleteTask = useCallback(async (id) => {
    dispatch(taskStart());
    try {
      await taskService.deleteTask(id);
      dispatch(deleteTaskSuccess(id));
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to delete task';
      dispatch(taskFailure(message));
      throw new Error(message);
    }
  }, [dispatch]);

  const duplicateTask = useCallback(async (id) => {
    dispatch(taskStart());
    try {
      const response = await taskService.duplicateTask(id);
      dispatch(addTaskSuccess(response.data.task));
      return response.data.task;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to duplicate task';
      dispatch(taskFailure(message));
      throw new Error(message);
    }
  }, [dispatch]);

  const archiveTask = useCallback(async (id) => {
    dispatch(taskStart());
    try {
      const response = await taskService.archiveTask(id);
      dispatch(deleteTaskSuccess(id)); // Remove from active list
      return response.data.task;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to archive task';
      dispatch(taskFailure(message));
      throw new Error(message);
    }
  }, [dispatch]);

  const restoreTask = useCallback(async (id) => {
    dispatch(taskStart());
    try {
      const response = await taskService.restoreTask(id);
      dispatch(deleteTaskSuccess(id)); // Remove from archived list
      return response.data.task;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to restore task';
      dispatch(taskFailure(message));
      throw new Error(message);
    }
  }, [dispatch]);

  const changeFilters = useCallback((newFilters) => {
    dispatch(setFilters(newFilters));
  }, [dispatch]);

  const changeViewMode = useCallback((mode) => {
    dispatch(setViewMode(mode));
  }, [dispatch]);

  return {
    ...taskState,
    fetchTasks,
    fetchDashboard,
    createTask,
    updateTask,
    deleteTask,
    duplicateTask,
    archiveTask,
    restoreTask,
    changeFilters,
    changeViewMode,
  };
};
