import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder = '',
  error = '',
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col w-full gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-700 dark:text-slate-300 select-none"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        ref={ref}
        placeholder={placeholder}
        className={`w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border rounded-input transition-colors duration-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-900 ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-slate-200 dark:border-slate-700'
        }`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 mt-0.5" id={`${inputId}-error`}>
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default React.memo(Input);
