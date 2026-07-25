import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme.js';
import { useAuth } from '../hooks/useAuth.js';
import Card from '../components/common/Card.jsx';
import Button from '../components/common/Button.jsx';
import toast from 'react-hot-toast';
import { Sun, Moon, Bell, ShieldAlert, Check } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { logoutUser } = useAuth();

  const [toastsEnabled, setToastsEnabled] = useState(
    localStorage.getItem('toastsEnabled') !== 'false'
  );

  const handleToastsToggle = () => {
    const newVal = !toastsEnabled;
    setToastsEnabled(newVal);
    localStorage.setItem('toastsEnabled', newVal.toString());
    toast.success(`Notifications ${newVal ? 'enabled' : 'disabled'}`);
  };

  const handleDeactivate = () => {
    if (
      window.confirm(
        'WARNING: Deactivating your account will immediately sign you out and delete your cached data. This action is destructive. Are you sure you want to proceed?'
      )
    ) {
      toast.success('Your session was terminated. Account deactivated.');
      logoutUser();
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Platform Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize your dashboard preferences, notifications, and manage credentials.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Appearance Settings */}
        <Card title="Appearance Preferences">
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                {darkMode ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-primary" />}
                Interface Theme
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Switch between Light and Dark visual modes for the platform.
              </span>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                darkMode ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  darkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </Card>

        {/* Notifications Settings */}
        <Card title="Alerts & Notifications">
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Bell className="h-4 w-4 text-primary" />
                Toast Notifications
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Display immediate slide-up confirmation cards for workspace events.
              </span>
            </div>

            <button
              onClick={handleToastsToggle}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                toastsEnabled ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  toastsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 bg-red-50/20 dark:bg-red-950/5 dark:border-red-900/30">
          <div className="flex flex-col gap-1 pb-3 border-b border-red-100 dark:border-red-900/20 mb-4">
            <h4 className="text-sm font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5">
              <ShieldAlert className="h-4.5 w-4.5" />
              Danger Zone
            </h4>
            <span className="text-[10px] text-red-650/80 dark:text-red-400/80">
              Irreversible actions that modify or purge your workspace profile.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Deactivate My Account
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Instantly disconnects your active sessions and logs you out.
              </span>
            </div>

            <Button
              variant="danger"
              size="small"
              onClick={handleDeactivate}
              className="px-4"
            >
              Deactivate Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
