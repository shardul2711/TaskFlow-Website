import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Zap } from 'lucide-react';

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark transition-colors duration-300 px-4">
      {/* Background decoration elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[80px] pointer-events-none dark:bg-primary/10" />

      <div className="w-full max-w-[440px] z-10 flex flex-col items-center">
        {/* Upper logo indicator */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-btn bg-primary text-white shadow-md">
            <Zap className="h-7 w-7 fill-current" />
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            TaskFlow Pro
          </span>
        </div>

        {/* Content Box */}
        <div className="w-full bg-white dark:bg-slate-800 rounded-modal border border-border-light dark:border-border-dark shadow-xl p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
