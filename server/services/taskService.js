import Task from '../models/Task.js';
import User from '../models/User.js';

class TaskService {
  async createTask(taskData, creatorId) {
    const task = await Task.create({
      ...taskData,
      createdBy: creatorId,
    });
    return await task.populate([
      { path: 'createdBy', select: 'name email avatar' },
      { path: 'assignedTo', select: 'name email avatar' },
    ]);
  }

  async getTasks(userId, queryParams) {
    const {
      search,
      status,
      priority,
      sortBy = 'newest',
      page = 1,
      limit = 10,
      archived = 'false',
    } = queryParams;

    const parsedPage = Math.max(1, parseInt(page));
    const parsedLimit = Math.max(1, parseInt(limit));
    const skip = (parsedPage - 1) * parsedLimit;

    // Filter query: User can see tasks they created OR are assigned to
    const query = {
      $or: [{ createdBy: userId }, { assignedTo: userId }],
      isArchived: archived === 'true',
    };

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    // Debounced search logic (in title, description, tags, or assigned user name)
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      
      // Find matching user IDs
      const matchingUsers = await User.find({ name: searchRegex }).select('_id');
      const userIds = matchingUsers.map((u) => u._id);

      query.$and = [
        {
          $or: [
            { title: searchRegex },
            { description: searchRegex },
            { tags: { $in: [searchRegex] } },
            { assignedTo: { $in: userIds } },
          ],
        },
      ];
    }

    // Determine Sort options
    let sortOption = {};
    let isPrioritySort = false;

    if (sortBy === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (sortBy === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sortBy === 'alphabetical') {
      sortOption = { title: 1 };
    } else if (sortBy === 'deadline') {
      sortOption = { dueDate: 1 };
    } else if (sortBy === 'priority') {
      isPrioritySort = true;
    }

    let tasks;
    let totalTasks;

    if (isPrioritySort) {
      // Sorting by priority requires a custom aggregation pipeline to weight strings
      const pipeline = [
        { $match: query },
        {
          $addFields: {
            priorityWeight: {
              $switch: {
                branches: [
                  { case: { $eq: ['$priority', 'critical'] }, then: 4 },
                  { case: { $eq: ['$priority', 'high'] }, then: 3 },
                  { case: { $eq: ['$priority', 'medium'] }, then: 2 },
                  { case: { $eq: ['$priority', 'low'] }, then: 1 },
                ],
                default: 0,
              },
            },
          },
        },
        { $sort: { priorityWeight: -1, createdAt: -1 } },
        { $skip: skip },
        { $limit: parsedLimit },
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        { $unwind: { path: '$createdBy', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'users',
            localField: 'assignedTo',
            foreignField: '_id',
            as: 'assignedTo',
          },
        },
        { $unwind: { path: '$assignedTo', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            'createdBy.password': 0,
            'assignedTo.password': 0,
            priorityWeight: 0,
          },
        },
      ];

      tasks = await Task.aggregate(pipeline);
      totalTasks = await Task.countDocuments(query);
    } else {
      tasks = await Task.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(parsedLimit)
        .populate('createdBy', 'name email avatar')
        .populate('assignedTo', 'name email avatar');

      totalTasks = await Task.countDocuments(query);
    }

    return {
      tasks,
      pagination: {
        total: totalTasks,
        pages: Math.ceil(totalTasks / parsedLimit),
        page: parsedPage,
        limit: parsedLimit,
      },
    };
  }

  async getTaskById(taskId, userId) {
    const task = await Task.findById(taskId)
      .populate('createdBy', 'name email avatar')
      .populate('assignedTo', 'name email avatar');

    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    // Authorization check: User must be creator or assignee
    if (
      task.createdBy._id.toString() !== userId &&
      task.assignedTo._id.toString() !== userId
    ) {
      const error = new Error('Not authorized to access this task');
      error.statusCode = 403;
      throw error;
    }

    return task;
  }

  async updateTask(taskId, updateData, userId) {
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    // Authorization: User must be creator or assignee
    if (
      task.createdBy.toString() !== userId &&
      task.assignedTo.toString() !== userId
    ) {
      const error = new Error('Not authorized to update this task');
      error.statusCode = 403;
      throw error;
    }

    // Prevent direct modification of createdBy
    delete updateData.createdBy;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name email avatar')
      .populate('assignedTo', 'name email avatar');

    return updatedTask;
  }

  async deleteTask(taskId, userId) {
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    // Authorization: Only the creator can hard-delete the task
    if (task.createdBy.toString() !== userId) {
      const error = new Error('Not authorized to delete this task. Only the creator can delete it.');
      error.statusCode = 403;
      throw error;
    }

    await Task.findByIdAndDelete(taskId);
    return { id: taskId };
  }

  async duplicateTask(taskId, userId) {
    const task = await this.getTaskById(taskId, userId);
    
    const duplicatedTask = await Task.create({
      title: `${task.title} (Copy)`,
      description: task.description,
      priority: task.priority,
      status: 'pending',
      assignedTo: task.assignedTo._id,
      createdBy: userId,
      dueDate: task.dueDate,
      tags: task.tags,
      attachment: task.attachment,
      isArchived: false,
    });

    return await duplicatedTask.populate([
      { path: 'createdBy', select: 'name email avatar' },
      { path: 'assignedTo', select: 'name email avatar' },
    ]);
  }

  async archiveTask(taskId, userId) {
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    if (
      task.createdBy.toString() !== userId &&
      task.assignedTo.toString() !== userId
    ) {
      const error = new Error('Not authorized to archive this task');
      error.statusCode = 403;
      throw error;
    }

    task.isArchived = true;
    await task.save();
    return task;
  }

  async restoreTask(taskId, userId) {
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    if (
      task.createdBy.toString() !== userId &&
      task.assignedTo.toString() !== userId
    ) {
      const error = new Error('Not authorized to restore this task');
      error.statusCode = 403;
      throw error;
    }

    task.isArchived = false;
    await task.save();
    return task;
  }
}

export default new TaskService();
