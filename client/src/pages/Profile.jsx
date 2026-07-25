import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth.js';
import { useTasks } from '../hooks/useTasks.js';
import taskService from '../services/taskService.js';
import authService from '../services/authService.js';
import Card from '../components/common/Card.jsx';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import Avatar from '../components/common/Avatar.jsx';
import toast from 'react-hot-toast';
import { Camera, Shield, User, Award, Calendar } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const { stats, fetchDashboard } = useTasks();

  const [avatarUploading, setAvatarUploading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Form for Profile details
  const {
    register: registerDetails,
    handleSubmit: handleDetailsSubmit,
    setValue: setDetailsValue,
    formState: { errors: detailsErrors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  // Form for password updates
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    watch: watchPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPasswordVal = watchPassword('newPassword');

  useEffect(() => {
    fetchDashboard().catch((err) => console.error(err));
    if (user) {
      setDetailsValue('name', user.name);
      setDetailsValue('email', user.email);
    }
  }, [fetchDashboard, user, setDetailsValue]);

  const onDetailsSubmit = async (data) => {
    try {
      await updateProfile({ name: data.name, email: data.email });
      toast.success('Profile details updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile details');
    }
  };

  const onPasswordSubmit = async (data) => {
    setPasswordLoading(true);
    try {
      await authService.changePassword(data.currentPassword, data.newPassword);
      toast.success('Password changed successfully!');
      resetPasswordForm();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Avatar file size must be less than 2MB');
      return;
    }

    setAvatarUploading(true);
    try {
      const uploadRes = await taskService.uploadAttachment(file);
      const secureUrl = uploadRes.data.url;
      await updateProfile({ avatar: secureUrl });
      toast.success('Avatar updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Avatar upload failed');
    } finally {
      setAvatarUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          My Account Profile
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal details, profile avatar, credentials, and track metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left widget column: Avatar, Statistics */}
        <div className="flex flex-col gap-6">
          {/* Avatar card */}
          <Card className="flex flex-col items-center text-center p-6 gap-4">
            <div className="relative group">
              <Avatar name={user.name} src={user.avatar} size="xl" className="ring-4 ring-primary/10" />
              
              {/* Photo Upload Trigger */}
              <label className="absolute bottom-1 right-1 h-8 w-8 bg-primary hover:bg-primary-hover text-white rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors border-2 border-white dark:border-slate-800">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                  disabled={avatarUploading}
                />
              </label>
            </div>

            <div className="mt-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{user.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{user.email}</p>
            </div>

            {avatarUploading && (
              <span className="text-[10px] text-primary font-semibold animate-pulse">
                Uploading avatar...
              </span>
            )}

            <div className="w-full h-px bg-border-light dark:bg-border-dark my-1" />

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-650 dark:text-slate-400">
              <Calendar className="h-4 w-4 text-slate-400" />
              Member since: {new Date(user.createdAt).toLocaleDateString([], { month: 'short', year: 'numeric' })}
            </div>
          </Card>

          {/* Stats summary */}
          <Card title="Workspace Accomplishments">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-btn bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Award className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-slate-700 dark:text-slate-350 font-medium">Completed Tasks</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {stats?.completed || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-btn bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <Play className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-slate-700 dark:text-slate-350 font-medium">In Progress Tasks</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {stats?.inProgress || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-btn bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-slate-700 dark:text-slate-350 font-medium">Pending Tasks</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {stats?.pending || 0}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column: Settings form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Details Profile Form */}
          <Card title="Edit Personal Details">
            <form onSubmit={handleDetailsSubmit(onDetailsSubmit)} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Name *"
                  type="text"
                  error={detailsErrors.name?.message}
                  {...registerDetails('name', {
                    required: 'Name is required',
                    minLength: { value: 3, message: 'Name must be at least 3 characters' },
                  })}
                />
                
                <Input
                  label="Email *"
                  type="email"
                  error={detailsErrors.email?.message}
                  {...registerDetails('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
              </div>

              <div className="flex justify-end mt-2">
                <Button type="submit" isLoading={authLoading}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>

          {/* Change Password Form */}
          <Card title="Update Security Credentials">
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="flex flex-col gap-4">
              <Input
                label="Current Password *"
                type="password"
                placeholder="Enter current password"
                error={passwordErrors.currentPassword?.message}
                {...registerPassword('currentPassword', { required: 'Current password is required' })}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="New Password *"
                  type="password"
                  placeholder="At least 8 characters"
                  error={passwordErrors.newPassword?.message}
                  {...registerPassword('newPassword', {
                    required: 'New password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    validate: {
                      hasUpper: (v) => /[A-Z]/.test(v) || 'Must contain at least one uppercase letter',
                      hasLower: (v) => /[a-z]/.test(v) || 'Must contain at least one lowercase letter',
                      hasDigit: (v) => /\d/.test(v) || 'Must contain at least one number',
                      hasSpecial: (v) => /[@$!%*?&]/.test(v) || 'Must contain at least one special character (@$!%*?&)',
                    },
                  })}
                />

                <Input
                  label="Confirm New Password *"
                  type="password"
                  placeholder="Repeat new password"
                  error={passwordErrors.confirmPassword?.message}
                  {...registerPassword('confirmPassword', {
                    required: 'Please repeat new password',
                    validate: (v) => v === newPasswordVal || 'Passwords do not match',
                  })}
                />
              </div>

              <div className="flex justify-end mt-2">
                <Button type="submit" variant="danger" isLoading={passwordLoading}>
                  Update Password
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
