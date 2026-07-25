import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useTasks } from '../hooks/useTasks.js';
import { Spinner } from '../components/common/Loader.jsx';
import Card from '../components/common/Card.jsx';
import Badge from '../components/common/Badge.jsx';
import Avatar from '../components/common/Avatar.jsx';
import Button from '../components/common/Button.jsx';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Play,
  Calendar,
  Plus,
  ArrowRight,
  TrendingUp,
  Settings,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    stats,
    charts,
    recentTasks,
    upcomingDeadlines,
    loading,
    fetchDashboard,
  } = useTasks();

  useEffect(() => {
    fetchDashboard().catch((err) => console.error(err));
  }, [fetchDashboard]);

  if (loading && !stats) {
    return <Spinner size="large" className="min-h-[70vh]" />;
  }

  // Format today's date
  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const cardsInfo = stats
    ? [
        {
          title: 'Total Tasks',
          value: stats.totalTasks,
          icon: ListTodo,
          color: 'text-primary bg-primary/10',
        },
        {
          title: 'In Progress',
          value: stats.inProgress,
          icon: Play,
          color: 'text-blue-500 bg-blue-500/10',
        },
        {
          title: 'Completed',
          value: stats.completed,
          icon: CheckCircle2,
          color: 'text-emerald-500 bg-emerald-500/10',
        },
        {
          title: 'Pending',
          value: stats.pending,
          icon: Clock,
          color: 'text-amber-500 bg-amber-500/10',
        },
        {
          title: 'Overdue',
          value: stats.overdue,
          icon: AlertTriangle,
          color: 'text-red-500 bg-red-500/10',
        },
        {
          title: 'Critical/High',
          value: stats.highPriority,
          icon: TrendingUp,
          color: 'text-rose-500 bg-rose-500/10',
        },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-blue-500 text-white rounded-modal p-6 md:p-8 shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#ffffff15,transparent)]" />
        <div className="z-10">
          <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider">{todayStr}</span>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-1">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-sm text-blue-100 mt-2 max-w-xl">
            {stats?.completed === stats?.totalTasks && stats?.totalTasks > 0
              ? 'Amazing work! You completed all assigned tasks. Rest up or start plan for next week.'
              : `You have completed ${stats?.completed || 0} of your ${stats?.totalTasks || 0} tasks. You currently have ${stats?.overdue || 0} overdue items.`}
          </p>
        </div>
        <Button
          size="medium"
          variant="secondary"
          className="z-10 bg-white text-primary hover:bg-slate-50 shrink-0 self-start md:self-auto"
          icon={<Plus className="h-4 w-4" />}
          onClick={() => navigate('/tasks/new')}
        >
          Create Task
        </Button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cardsInfo.map((card, i) => {
          const Icon = card.icon;
          return (
            <Card key={i} className="flex flex-col gap-2 relative overflow-hidden hover:translate-y-[-2px] transition-transform duration-200">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                  {card.title}
                </span>
                <div className={`p-1.5 rounded-btn ${card.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {card.value}
              </span>
            </Card>
          );
        })}
      </div>

      {/* Charts section */}
      {charts && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Distribution (Pie Chart) */}
          <Card title="Task Distribution (Status)">
            <div className="h-[240px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.statusDistribution.filter((s) => s.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {charts.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Pie Legends */}
              <div className="flex flex-col gap-2 shrink-0 pr-2">
                {charts.statusDistribution.map((status, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: status.color }} />
                    <span className="text-slate-650 dark:text-slate-400 font-medium truncate">{status.name}</span>
                    <span className="text-slate-900 dark:text-white font-bold ml-auto">{status.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Priority Distribution (Bar Chart) */}
          <Card title="Task Priorities">
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.priorityDistribution} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {charts.priorityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Monthly Completion (Line/Area Chart) */}
          <Card title="Monthly Productivity">
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts.monthlyProductivity} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-700" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* Grid: Recent Tasks, Upcoming Deadlines, Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <Card
          title="Recent Task Updates"
          actions={
            <Button variant="ghost" size="small" className="text-primary hover:underline pr-0" onClick={() => navigate('/tasks')}>
              View All
            </Button>
          }
        >
          <div className="flex flex-col gap-3">
            {recentTasks.length === 0 ? (
              <p className="text-xs text-slate-450 dark:text-slate-500 py-6 text-center">No recent tasks</p>
            ) : (
              recentTasks.map((task) => (
                <div
                  key={task._id}
                  onClick={() => navigate(`/tasks/${task._id}`)}
                  className="flex items-center justify-between p-3 rounded-btn bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-700/40 border border-border-light dark:border-border-dark cursor-pointer transition-colors"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-xs font-semibold text-slate-800 dark:text-white truncate">
                      {task.title}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      Due: {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <Badge value={task.status} />
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Upcoming Deadlines */}
        <Card title="Upcoming Deadlines">
          <div className="flex flex-col gap-3">
            {upcomingDeadlines.length === 0 ? (
              <p className="text-xs text-slate-450 dark:text-slate-500 py-6 text-center">No upcoming deadlines</p>
            ) : (
              upcomingDeadlines.map((task) => (
                <div
                  key={task._id}
                  onClick={() => navigate(`/tasks/${task._id}`)}
                  className="flex items-center justify-between p-3 rounded-btn bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-700/40 border border-border-light dark:border-border-dark cursor-pointer transition-colors"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-xs font-semibold text-slate-800 dark:text-white truncate">
                      {task.title}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3 shrink-0" />
                      {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <Badge type="priority" value={task.priority} />
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Quick Actions Panel */}
        <Card title="Quick Actions">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/tasks/new')}
              className="flex flex-col items-center justify-center p-4 rounded-btn border border-border-light dark:border-border-dark bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-700/30 text-slate-700 dark:text-slate-350 hover:text-primary dark:hover:text-white transition-all group"
            >
              <Plus className="h-5 w-5 mb-2 text-slate-450 dark:text-slate-500 group-hover:text-primary" />
              <span className="text-xs font-semibold">New Task</span>
            </button>
            
            <button
              onClick={() => navigate('/tasks')}
              className="flex flex-col items-center justify-center p-4 rounded-btn border border-border-light dark:border-border-dark bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-700/30 text-slate-700 dark:text-slate-350 hover:text-primary dark:hover:text-white transition-all group"
            >
              <ListTodo className="h-5 w-5 mb-2 text-slate-450 dark:text-slate-500 group-hover:text-primary" />
              <span className="text-xs font-semibold">Active Tasks</span>
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="flex flex-col items-center justify-center p-4 rounded-btn border border-border-light dark:border-border-dark bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-700/30 text-slate-700 dark:text-slate-350 hover:text-primary dark:hover:text-white transition-all group"
            >
              <Avatar name={user?.name} src={user?.avatar} size="xs" className="mb-2" />
              <span className="text-xs font-semibold">My Profile</span>
            </button>

            <button
              onClick={() => navigate('/settings')}
              className="flex flex-col items-center justify-center p-4 rounded-btn border border-border-light dark:border-border-dark bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-700/30 text-slate-700 dark:text-slate-350 hover:text-primary dark:hover:text-white transition-all group"
            >
              <Settings className="h-5 w-5 mb-2 text-slate-450 dark:text-slate-500 group-hover:text-primary" />
              <span className="text-xs font-semibold">Settings</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
