import React from 'react';

export const Spinner = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: 'h-4 w-4 stroke-2',
    medium: 'h-8 w-8 stroke-[2.5]',
    large: 'h-12 w-12 stroke-[3]',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        className={`animate-spin text-primary ${sizes[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export const SkeletonCard = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-card p-5 border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-badge w-16"></div>
          </div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
          <div className="flex justify-between items-center mt-2 border-t border-slate-100 dark:border-slate-700 pt-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
            <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded-full w-7"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export const SkeletonTable = ({ rows = 5, cols = 5 }) => {
  return (
    <div className="w-full animate-pulse border border-slate-200 dark:border-slate-700 rounded-table overflow-hidden">
      <div className="bg-slate-100 dark:bg-slate-800 h-10 border-b border-slate-200 dark:border-slate-700 flex items-center px-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16 mr-10"></div>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="h-16 border-b border-slate-150 dark:border-slate-800 flex items-center px-4">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24 mr-10"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const SkeletonChart = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-slate-800 rounded-card p-5 border border-slate-200 dark:border-slate-700 flex flex-col gap-4 w-full h-[300px] justify-between">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
      <div className="flex items-end justify-between gap-2 h-48 w-full px-2">
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-t h-1/3"></div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-t h-3/5"></div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-t h-4/5"></div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-t h-2/5"></div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-t h-1/2"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-10"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-10"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-10"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-10"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-10"></div>
      </div>
    </div>
  );
};
