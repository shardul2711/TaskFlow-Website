import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks.js';
import { Spinner } from '../components/common/Loader.jsx';
import Card from '../components/common/Card.jsx';
import Badge from '../components/common/Badge.jsx';
import Avatar from '../components/common/Avatar.jsx';
import Button from '../components/common/Button.jsx';
import taskService from '../services/taskService.js';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  Calendar,
  User,
  Tags,
  FileText,
  Edit,
  Trash2,
  Copy,
  FolderDown,
  RefreshCw,
  Download,
} from 'lucide-react';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteTask, duplicateTask, archiveTask, restoreTask } = useTasks();
  
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTaskDetails = async () => {
    setLoading(true);
    try {
      const response = await taskService.getTaskById(id);
      setTask(response.data.task);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch task details');
      navigate('/tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to permanently delete this task?')) {
      try {
        await deleteTask(task._id);
        toast.success('Task deleted successfully');
        navigate('/tasks');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleDuplicate = async () => {
    try {
      const duplicated = await duplicateTask(task._id);
      toast.success('Task duplicated successfully');
      navigate(`/tasks/${duplicated._id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleArchive = async () => {
    try {
      await archiveTask(task._id);
      toast.success('Task archived successfully');
      navigate('/tasks');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRestore = async () => {
    try {
      await restoreTask(task._id);
      toast.success('Task restored successfully');
      navigate('/tasks');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <Spinner size="large" className="min-h-[70vh]" />;
  }

  if (!task) return null;

  // Determine if attachment is an image for rendering previews
  const isImageAttachment = (url) => {
    if (!url) return false;
    const ext = url.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) || url.includes('cloudinary');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back to list trigger */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/tasks')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to tasks
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Details block */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="flex flex-wrap gap-2">
                <Badge type="priority" value={task.priority} />
                <Badge value={task.status} />
              </div>
              <span className="text-[10px] text-slate-450 dark:text-slate-500 font-medium">
                Created on {new Date(task.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-extrabold text-slate-950 dark:text-white">
              {task.title}
            </h1>
            
            <div className="text-slate-650 dark:text-slate-350 text-sm leading-relaxed whitespace-pre-wrap mt-2">
              {task.description}
            </div>

            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs font-bold text-slate-550 dark:text-slate-400 flex items-center gap-1">
                  <Tags className="h-3.5 w-3.5" />
                  Tags:
                </span>
                {task.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Card>

          {/* Attachment Preview widget */}
          {task.attachment && (
            <Card title="Task Attachments">
              <div className="flex flex-col gap-4 mt-1">
                {isImageAttachment(task.attachment) ? (
                  <div className="relative group max-w-md rounded-card border border-border-light dark:border-border-dark overflow-hidden bg-slate-50 dark:bg-slate-900">
                    <img
                      src={task.attachment}
                      alt="Attachment Preview"
                      className="max-h-[300px] w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a
                        href={task.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-white text-slate-900 rounded-full shadow-md hover:bg-slate-100 transition-colors"
                        title="Open attachment"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 rounded-btn border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-900">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="h-8 w-8 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                          Attachment File
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          Document attachment
                        </p>
                      </div>
                    </div>
                    <a
                      href={task.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                    >
                      <Download className="h-4 w-4" />
                      View File
                    </a>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar Actions / Meta blocks */}
        <div className="flex flex-col gap-6">
          {/* Metadata Card */}
          <Card title="Task Information">
            <div className="flex flex-col gap-4">
              {/* Due Date */}
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-slate-450 dark:text-slate-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-450 dark:text-slate-500 font-medium">Due Date</span>
                  <span className="text-xs text-slate-800 dark:text-white font-bold">
                    {new Date(task.dueDate).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Assignee */}
              {task.assignedTo && (
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-slate-450 dark:text-slate-500 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-450 dark:text-slate-500 font-medium">Assigned To</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar name={task.assignedTo.name} src={task.assignedTo.avatar} size="xs" />
                      <span className="text-xs text-slate-800 dark:text-white font-semibold">
                        {task.assignedTo.name}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Creator */}
              {task.createdBy && (
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-slate-450 dark:text-slate-500 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-450 dark:text-slate-500 font-medium">Created By</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar name={task.createdBy.name} src={task.createdBy.avatar} size="xs" />
                      <span className="text-xs text-slate-800 dark:text-white font-semibold">
                        {task.createdBy.name}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions Control Card */}
          <Card title="Quick Actions">
            <div className="flex flex-col gap-3">
              <Button
                variant="secondary"
                className="w-full justify-start text-xs font-semibold"
                icon={<Edit className="h-4 w-4" />}
                onClick={() => navigate(`/tasks/edit/${task._id}`)}
              >
                Edit Task Details
              </Button>
              
              <Button
                variant="secondary"
                className="w-full justify-start text-xs font-semibold"
                icon={<Copy className="h-4 w-4" />}
                onClick={handleDuplicate}
              >
                Duplicate Task
              </Button>

              {task.isArchived ? (
                <Button
                  variant="secondary"
                  className="w-full justify-start text-xs font-semibold"
                  icon={<RefreshCw className="h-4 w-4" />}
                  onClick={handleRestore}
                >
                  Restore Task
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="w-full justify-start text-xs font-semibold"
                  icon={<FolderDown className="h-4 w-4" />}
                  onClick={handleArchive}
                >
                  Archive Task
                </Button>
              )}

              <Button
                variant="danger"
                className="w-full justify-start text-xs font-semibold"
                icon={<Trash2 className="h-4 w-4" />}
                onClick={handleDelete}
              >
                Permanently Delete
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
