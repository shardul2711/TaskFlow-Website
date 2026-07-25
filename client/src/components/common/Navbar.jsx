import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Sun, Moon, Bell, Search, User, Settings, LogOut, Check } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useTasks } from '../../hooks/useTasks.js';
import { markAllAsRead, clearNotifications } from '../../store/features/notificationSlice.js';
import Avatar from './Avatar.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, logoutUser } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { filters, changeFilters } = useTasks();

  const notifications = useSelector((state) => state.notification.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const [searchVal, setSearchVal] = useState(filters.search || '');
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Sync search input with global filter search term
  useEffect(() => {
    setSearchVal(filters.search || '');
  }, [filters.search]);

  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchVal(val);
    changeFilters({ search: val });
    
    // Redirect to tasks page if user is searching from elsewhere
    if (location.pathname !== '/tasks' && val.trim() !== '') {
      navigate('/tasks');
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logoutUser();
      navigate('/login');
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[280px] lg:group-hover:left-[80px] h-[72px] bg-white dark:bg-sidebar-dark border-b border-border-light dark:border-border-dark flex items-center justify-between px-6 z-20 transition-all duration-300">
      {/* Search Input bar */}
      <div className="flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchVal}
            onChange={handleSearchChange}
            placeholder="Search tasks, descriptions, tags..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 border border-border-light dark:border-border-dark rounded-input outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>
      </div>

      {/* Toolbar actions */}
      <div className="flex items-center gap-4">
        {/* Theme toggle switch */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-sidebar-dark">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-modal border border-border-light dark:border-border-dark shadow-lg overflow-hidden z-30">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-border-light dark:border-border-dark">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={() => dispatch(markAllAsRead())}
                    className="text-[10px] text-primary hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-450 dark:text-slate-500">
                    No new notifications.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-start gap-3 transition-colors ${
                        !notif.read ? 'bg-primary/5 dark:bg-primary/10' : ''
                      }`}
                    >
                      <div className="flex-1">
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                          {notif.message}
                        </p>
                        <span className="text-[10px] text-slate-450 dark:text-slate-500">
                          {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-2 text-center border-t border-border-light dark:border-border-dark">
                  <button
                    type="button"
                    onClick={() => dispatch(clearNotifications())}
                    className="text-[10px] text-red-500 hover:underline font-semibold"
                  >
                    Clear all logs
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User profile dropdown widget */}
        {user && (
          <div className="relative flex items-center" ref={profileRef}>
            <button
              type="button"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 outline-none"
              aria-label="View user profile menu"
            >
              <Avatar name={user.name} src={user.avatar} size="sm" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 top-10 mt-2 w-48 bg-white dark:bg-slate-800 rounded-modal border border-border-light dark:border-border-dark shadow-lg py-1.5 z-30">
                <div className="px-4 py-2 border-b border-border-light dark:border-border-dark mb-1">
                  <p className="text-xs font-semibold text-slate-800 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-450 dark:text-slate-500 truncate">
                    {user.email}
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileDropdown(false);
                    navigate('/profile');
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-xs font-medium text-slate-650 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  <User className="h-4 w-4" />
                  My Profile
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileDropdown(false);
                    navigate('/settings');
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-xs font-medium text-slate-650 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                
                <div className="h-px bg-border-light dark:bg-border-dark my-1" />
                
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
