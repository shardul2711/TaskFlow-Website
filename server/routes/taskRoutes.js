import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  duplicateTask,
  archiveTask,
  restoreTask,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import { taskValidator } from '../validators/taskValidator.js';
import { validateRequest } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', taskValidator, validateRequest, createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', taskValidator, validateRequest, updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/duplicate', duplicateTask);
router.put('/:id/archive', archiveTask);
router.put('/:id/restore', restoreTask);

export default router;
