import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import { HelpCircle, ArrowRight } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 gap-6 select-none">
      <div className="h-20 w-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 animate-bounce">
        <HelpCircle className="h-10 w-10 text-primary" />
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Page Not Found (404)
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
        </p>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <Button
          size="medium"
          onClick={() => navigate('/dashboard')}
          icon={<ArrowRight className="h-4 w-4" />}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
