import taskService from '../services/taskService.js';

export const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user._id);
    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: { task },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const result = await taskService.getTasks(req.user._id, req.query);
    return res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: result,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user._id);
    return res.status(200).json({
      success: true,
      message: 'Task retrieved successfully',
      data: { task },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body, req.user._id);
    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: { task },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const result = await taskService.deleteTask(req.params.id, req.user._id);
    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: result,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const duplicateTask = async (req, res, next) => {
  try {
    const task = await taskService.duplicateTask(req.params.id, req.user._id);
    return res.status(201).json({
      success: true,
      message: 'Task duplicated successfully',
      data: { task },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const archiveTask = async (req, res, next) => {
  try {
    const task = await taskService.archiveTask(req.params.id, req.user._id);
    return res.status(200).json({
      success: true,
      message: 'Task archived successfully',
      data: { task },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const restoreTask = async (req, res, next) => {
  try {
    const task = await taskService.restoreTask(req.params.id, req.user._id);
    return res.status(200).json({
      success: true,
      message: 'Task restored successfully',
      data: { task },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
