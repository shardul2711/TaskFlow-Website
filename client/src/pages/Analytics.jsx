import React, { useEffect } from 'react';
import { useTasks } from '../hooks/useTasks.js';
import { Spinner } from '../components/common/Loader.jsx';
import Card from '../components/common/Card.jsx';
import Button from '../components/common/Button.jsx';
import toast from 'react-hot-toast';
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
  CartesianGrid,
  AreaChart,
  Area,
  Legend,
} from 'recharts';
import { Download, TrendingUp, CheckCircle2, Clock, Play, FileSpreadsheet } from 'lucide-react';

const Analytics = () => {
  const { stats, charts, loading, fetchDashboard } = useTasks();

  useEffect(() => {
    fetchDashboard().catch((err) => console.error(err));
  }, [fetchDashboard]);

  const handleExportCSV = () => {
    if (!stats) return;
    
    // Generate simple mock CSV export
    const rows = [
      ['Metric', 'Value'],
      ['Total Tasks', stats.totalTasks],
      ['Completed', stats.completed],
      ['In Progress', stats.inProgress],
      ['Pending', stats.pending],
      ['Overdue', stats.overdue],
      ['High/Critical Priority', stats.highPriority],
      ['Completion Rate (%)', stats.completionPercentage],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'taskflow_analytics_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Analytics CSV report generated and downloaded!');
  };

  if (loading && !stats) {
    return <Spinner size="large" className="min-h-[70vh]" />;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Workspace Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deep dive into project throughput, team completions, and task allocations.
          </p>
        </div>

        <Button
          size="small"
          icon={<FileSpreadsheet className="h-4 w-4" />}
          onClick={handleExportCSV}
        >
          Export CSV Report
        </Button>
      </div>

      {stats && charts && (
        <>
          {/* Detailed Aggregation grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Completion Rate</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.completionPercentage}%</span>
                <span className="text-xs text-emerald-500 font-semibold flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                  Optimal
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Percentage of total workspace tasks that are resolved.
              </p>
            </Card>

            <Card className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Completed Tasks</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-450">{stats.completed}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">tasks done</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Total count of tasks successfully checked off.
              </p>
            </Card>

            <Card className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">In Progress Work</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-450">{stats.inProgress}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">active items</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Task items currently actively worked on by teammates.
              </p>
            </Card>

            <Card className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Overdue Risk</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-3xl font-extrabold ${stats.overdue > 0 ? 'text-red-650' : 'text-slate-900 dark:text-white'}`}>{stats.overdue}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">past deadline</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Active tasks which have passed their scheduled deadline.
              </p>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly productivity Area Chart */}
            <Card title="Monthly Completion Output">
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={charts.monthlyProductivity} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-700" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="completed" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCompleted)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Weekly output Bar Chart */}
            <Card title="Weekly Productivity Progress">
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.weeklyProgress} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-700" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                    <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Task allocations by status (Pie) */}
            <Card title="Task status distribution ratio">
              <div className="h-[280px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={charts.statusDistribution.filter((s) => s.value > 0)}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {charts.statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Task allocations by priority (Bar) */}
            <Card title="Priority allocation list">
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.priorityDistribution} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-700" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                    <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                      {charts.priorityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
