import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Task description is required'],
      trim: true,
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high', 'critical'],
        message: '{VALUE} is not a valid priority',
      },
      default: 'medium',
      required: [true, 'Task priority is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'in progress', 'completed', 'cancelled'],
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
      required: [true, 'Task status is required'],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Assigned user is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator user is required'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    tags: {
      type: [String],
      default: [],
    },
    attachment: {
      type: String,
      default: '',
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster search, filters, and pagination
taskSchema.index({ createdBy: 1, isArchived: 1, status: 1 });
taskSchema.index({ createdBy: 1, isArchived: 1, priority: 1 });
taskSchema.index({ createdBy: 1, isArchived: 1, dueDate: 1 });
taskSchema.index({ assignedTo: 1, isArchived: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;
