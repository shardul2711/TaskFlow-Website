import React from 'react';

const Badge = ({ type = 'status', value = '', className = '' }) => {
  const cleanValue = value.toLowerCase();

  const statusStyles = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
    'in progress': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
    cancelled: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
  };

  const priorityStyles = {
    low: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
    medium: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
    high: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20',
    critical: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
  };

  const baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-badge text-xs font-medium border select-none capitalize';

  const style = type === 'priority' ? priorityStyles[cleanValue] : statusStyles[cleanValue];
  const finalStyle = style || 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-350 dark:border-slate-700';

  return (
    <span className={`${baseStyle} ${finalStyle} ${className}`}>
      {value}
    </span>
  );
};

export default React.memo(Badge);
