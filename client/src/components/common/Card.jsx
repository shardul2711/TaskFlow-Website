import React from 'react';

const Card = ({ children, title, actions, className = '', ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-card border border-slate-200 dark:border-slate-700 shadow-card p-5 ${className}`}
      {...props}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700">
          {title && (
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {title}
            </h4>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default React.memo(Card);
