import Task from '../models/Task.js';

class DashboardService {
  async getDashboardData(userId) {
    const query = {
      $or: [{ createdBy: userId }, { assignedTo: userId }],
      isArchived: false,
    };

    // 1. Get raw task counts and aggregates
    const totalTasks = await Task.countDocuments(query);
    const completed = await Task.countDocuments({ ...query, status: 'completed' });
    const pending = await Task.countDocuments({ ...query, status: 'pending' });
    const inProgress = await Task.countDocuments({ ...query, status: 'in progress' });
    const cancelled = await Task.countDocuments({ ...query, status: 'cancelled' });
    
    // High priority is either 'high' or 'critical'
    const highPriority = await Task.countDocuments({
      ...query,
      priority: { $in: ['high', 'critical'] },
    });

    // Overdue count
    const now = new Date();
    const overdue = await Task.countDocuments({
      ...query,
      status: { $ne: 'completed' },
      dueDate: { $lt: now },
    });

    // Today's tasks count
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const todayTasks = await Task.countDocuments({
      ...query,
      dueDate: { $gte: startOfToday, $lte: endOfToday },
    });

    // Completion percentage
    const completionPercentage = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

    // 2. Task distribution by status (Pie Chart)
    const statusDistribution = [
      { name: 'Pending', value: pending, color: '#F59E0B' },
      { name: 'In Progress', value: inProgress, color: '#3B82F6' },
      { name: 'Completed', value: completed, color: '#10B981' },
      { name: 'Cancelled', value: cancelled, color: '#EF4444' },
    ];

    // 3. Task distribution by priority (Bar Chart)
    const lowPriority = await Task.countDocuments({ ...query, priority: 'low' });
    const medPriority = await Task.countDocuments({ ...query, priority: 'medium' });
    const hPriority = await Task.countDocuments({ ...query, priority: 'high' });
    const critPriority = await Task.countDocuments({ ...query, priority: 'critical' });

    const priorityDistribution = [
      { name: 'Low', value: lowPriority, color: '#10B981' },
      { name: 'Medium', value: medPriority, color: '#3B82F6' },
      { name: 'High', value: hPriority, color: '#F59E0B' },
      { name: 'Critical', value: critPriority, color: '#EF4444' },
    ];

    // 4. Monthly Productivity: Completed tasks over last 6 months (Line/Area Chart)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyAggregation = await Task.aggregate([
      {
        $match: {
          ...query,
          status: 'completed',
          updatedAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$updatedAt' },
            month: { $month: '$updatedAt' },
          },
          completedCount: { $sum: 1 },
        },
      },
    ]);

    // Format monthly data for chart
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyProductivity = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const targetYear = d.getFullYear();
      const targetMonth = d.getMonth() + 1; // 1-indexed for MongoDB group match

      const match = monthlyAggregation.find(
        (m) => m._id.year === targetYear && m._id.month === targetMonth
      );

      monthlyProductivity.push({
        name: `${monthNames[targetMonth - 1]} ${targetYear.toString().slice(-2)}`,
        completed: match ? match.completedCount : 0,
      });
    }

    // 5. Weekly progress: Tasks completed/updated in the last 7 days (Bar/Line Chart)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const weeklyAggregation = await Task.aggregate([
      {
        $match: {
          ...query,
          status: 'completed',
          updatedAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: '$updatedAt' },
          completedCount: { $sum: 1 },
        },
      },
    ]);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyProgress = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayOfWeekIndex = d.getDay() + 1; // 1 = Sun, 2 = Mon ...

      const match = weeklyAggregation.find((w) => w._id === dayOfWeekIndex);
      weeklyProgress.push({
        name: daysOfWeek[d.getDay()],
        completed: match ? match.completedCount : 0,
      });
    }

    // 6. Recent tasks: Fetch 5 most recently created/updated tasks
    const recentTasks = await Task.find(query)
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate('createdBy', 'name email avatar')
      .populate('assignedTo', 'name email avatar');

    // 7. Upcoming deadlines: Fetch 5 closest due-date tasks that are not completed
    const upcomingDeadlines = await Task.find({
      ...query,
      status: { $ne: 'completed' },
      dueDate: { $gte: now },
    })
      .sort({ dueDate: 1 })
      .limit(5)
      .populate('createdBy', 'name email avatar')
      .populate('assignedTo', 'name email avatar');

    return {
      stats: {
        totalTasks,
        completed,
        pending,
        inProgress,
        cancelled,
        overdue,
        highPriority,
        todayTasks,
        completionPercentage,
      },
      charts: {
        statusDistribution,
        priorityDistribution,
        monthlyProductivity,
        weeklyProgress,
      },
      recentTasks,
      upcomingDeadlines,
    };
  }
}

export default new DashboardService();
