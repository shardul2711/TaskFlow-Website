import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { toggleSidebar } from '../../store/features/uiSlice.js';
import { useAuth } from '../../hooks/useAuth.js';
import Avatar from './Avatar.jsx';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarExpanded = useSelector((state) => state.ui.sidebarExpanded);
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logoutUser();
      navigate('/login');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <motion.div
      animate={{ width: sidebarExpanded ? 280 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 bottom-0 left-0 z-30 flex flex-col bg-sidebar-light dark:bg-sidebar-dark border-r border-border-light dark:border-border-dark shrink-0 select-none overflow-hidden"
    >
      {/* Header / Logo */}
      <div className="relative flex items-center justify-between h-[72px] px-5 border-b border-border-light dark:border-border-dark">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-primary text-white shrink-0">
            <Zap className="h-6 w-6 fill-current" />
          </div>
          {sidebarExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-lg font-bold text-slate-900 dark:text-white truncate"
            >
              TaskFlow Pro
            </motion.span>
          )}
        </div>

        {/* Sidebar Collapse Toggle Button */}
        <button
          type="button"
          onClick={() => dispatch(toggleSidebar())}
          className="absolute -right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full border border-border-light bg-white text-slate-400 hover:text-slate-650 hover:bg-slate-50 dark:border-border-dark dark:bg-slate-800 dark:text-slate-350 dark:hover:bg-slate-700 shadow-sm"
        >
          {sidebarExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-btn text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {sidebarExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="truncate"
                >
                  {item.name}
                </motion.span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer User Widget */}
      {user && (
        <div className="p-4 border-t border-border-light dark:border-border-dark flex flex-col gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar name={user.name} src={user.avatar} size="sm" />
            {sidebarExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user.email}
                </p>
              </motion.div>
            )}
          </div>
          
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-btn text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {sidebarExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
