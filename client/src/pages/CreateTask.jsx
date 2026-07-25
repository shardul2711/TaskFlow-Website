import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks.js';
import authService from '../services/authService.js';
import taskService from '../services/taskService.js';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import toast from 'react-hot-toast';
import { ArrowLeft, Upload, FileText, X } from 'lucide-react';

const CreateTask = () => {
  const navigate = useNavigate();
  const { createTask, loading } = useTasks();

  const [users, setUsers] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [attachmentName, setAttachmentName] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      assignedTo: '',
      dueDate: '',
      tagsInput: '',
    },
  });

  // Fetch users list for assignee dropdown
  useEffect(() => {
    authService
      .getAllUsers()
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error('Failed to load teammates list', err));
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds the 5MB limit');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setAttachmentName(file.name);

    try {
      const response = await taskService.uploadAttachment(file, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      });
      setAttachmentUrl(response.data.url);
      toast.success('File uploaded successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'File upload failed');
      setAttachmentName('');
    } finally {
      setUploading(false);
    }
  };

  const removeAttachment = () => {
    setAttachmentUrl('');
    setAttachmentName('');
    setUploadProgress(0);
  };

  const onSubmit = async (data) => {
    // Process tags comma separation
    const tags = data.tagsInput
      ? data.tagsInput
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t !== '')
      : [];

    const taskPayload = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      assignedTo: data.assignedTo,
      dueDate: data.dueDate,
      tags,
      attachment: attachmentUrl,
    };

    try {
      await createTask(taskPayload);
      toast.success('Task created successfully!');
      navigate('/tasks');
    } catch (err) {
      toast.error(err.message || 'Failed to create task');
    }
  };

  // Get tomorrow date string for min date validation
  const getMinDateStr = () => {
    const today = new Date();
    // Restricting to future date
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      {/* Navigation trigger */}
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

      <Card title="Create New Task">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Title */}
          <Input
            label="Task Title *"
            type="text"
            placeholder="Describe the task goal..."
            error={errors.title?.message}
            {...register('title', { required: 'Task title is required' })}
          />

          {/* Description */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Task Description *
            </label>
            <textarea
              placeholder="Provide context, links, or criteria..."
              className={`w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border rounded-input transition-colors outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[120px] ${
                errors.description ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
              }`}
              {...register('description', { required: 'Task description is required' })}
            />
            {errors.description && (
              <span className="text-xs text-red-500 mt-0.5">{errors.description.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Priority selection */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Task Priority *
              </label>
              <select
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-input outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 dark:text-slate-200 font-medium"
                {...register('priority', { required: 'Priority is required' })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Status selection */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Task Status *
              </label>
              <select
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-input outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 dark:text-slate-200 font-medium"
                {...register('status', { required: 'Status is required' })}
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Assigned To */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Assignee *
              </label>
              <select
                className={`w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border rounded-input outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 dark:text-slate-200 font-medium ${
                  errors.assignedTo ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
                {...register('assignedTo', { required: 'Assignee is required' })}
              >
                <option value="">Select Teammate</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>
              {errors.assignedTo && (
                <span className="text-xs text-red-500 mt-0.5">{errors.assignedTo.message}</span>
              )}
            </div>

            {/* Due Date */}
            <Input
              label="Due Date * (Future dates only)"
              type="date"
              min={getMinDateStr()}
              error={errors.dueDate?.message}
              {...register('dueDate', { required: 'Due date is required' })}
            />
          </div>

          {/* Tags */}
          <Input
            label="Tags (Comma separated values)"
            type="text"
            placeholder="e.g. frontend, bug, auth"
            error={errors.tagsInput?.message}
            {...register('tagsInput')}
          />

          {/* File Upload Widget */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Attachment (Images, PDF, Documents - Max 5MB)
            </label>
            
            {!attachmentUrl ? (
              <label className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary rounded-modal p-6 flex flex-col items-center justify-center cursor-pointer transition-colors duration-250 bg-slate-50 dark:bg-slate-800/20 group">
                <Upload className="h-8 w-8 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-2">
                  Click or drag file here to upload
                </span>
                <span className="text-[10px] text-slate-450 dark:text-slate-500 mt-1">
                  Supports JPEG, PNG, PDF, DOCX, TXT up to 5MB
                </span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-btn border border-primary/20 bg-primary/5 dark:bg-primary/10">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-xs text-slate-800 dark:text-white truncate font-medium">
                    {attachmentName || 'Attachment Uploaded'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={removeAttachment}
                  className="text-slate-450 hover:text-red-500 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Progress bar */}
            {uploading && (
              <div className="w-full flex flex-col gap-1 mt-1">
                <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                  <span>Uploading file...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <Button
              variant="secondary"
              onClick={() => navigate('/tasks')}
              disabled={loading || uploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={loading}
              disabled={uploading}
            >
              Create Task
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateTask;
