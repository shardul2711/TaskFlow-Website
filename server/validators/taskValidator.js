import { body } from 'express-validator';
import mongoose from 'mongoose';

export const taskValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Task title is required')
    .isLength({ max: 100 })
    .withMessage('Task title cannot exceed 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Task description is required'),
  body('priority')
    .notEmpty()
    .withMessage('Priority is required')
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Priority must be low, medium, high, or critical'),
  body('dueDate')
    .notEmpty()
    .withMessage('Due date is required')
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date')
    .custom((value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(value);
      if (inputDate < today) {
        throw new Error('Due date must be in the future');
      }
      return true;
    }),
  body('assignedTo')
    .notEmpty()
    .withMessage('Assigned user is required')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Assigned user must be a valid ID');
      }
      return true;
    }),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings'),
  body('status')
    .optional()
    .isIn(['pending', 'in progress', 'completed', 'cancelled'])
    .withMessage('Status must be pending, in progress, completed, or cancelled'),
];
