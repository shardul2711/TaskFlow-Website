import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Zap, Shield, BarChart3, Layout, ChevronRight } from 'lucide-react';
import Button from '../components/common/Button.jsx';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const features = [
    {
      title: 'Visual Task Boards',
      description: 'Organize work into lists, grids, or drag-and-drop Kanban columns to track progress seamlessly.',
      icon: Layout,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20',
    },
    {
      title: 'Detailed Analytics',
      description: 'Monitor throughput, completions, and priority distribution using dynamic Recharts visualizations.',
      icon: BarChart3,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20',
    },
    {
      title: 'Enterprise Security',
      description: 'Keep your information secure with industry standard bcrypt hashing and protected JWT route handlers.',
      icon: Shield,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/20',
    },
    {
      title: 'Realtime Responsiveness',
      description: 'Experience responsive screens with persistent dark mode settings saved directly to local storage.',
      icon: Zap,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20',
    },
  ];

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300 flex flex-col relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none dark:bg-primary/10" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <header className="w-full max-w-7xl mx-auto h-20 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-primary text-white shadow-md">
            <Zap className="h-6 w-6 fill-current" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">TaskFlow Pro</span>
        </div>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Button variant="ghost" size="small" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button size="small" onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </>
          ) : (
            <Button size="small" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-6 py-12 md:py-20 text-center z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-badge bg-primary/10 text-primary text-xs font-semibold mb-6">
          <span>Release v1.0 is Live</span>
          <ChevronRight className="h-3 w-3" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight max-w-4xl">
          Streamline Your Workflow with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
            TaskFlow Pro
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          The ultimate task and team management SaaS platform built for modern development teams.
          Track project milestones, analyze bottlenecks, and deliver higher quality software.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Button size="large" onClick={handleCTA}>
            Start Free Trial
          </Button>
          <Button size="large" variant="secondary" onClick={() => navigate('/login')}>
            Request Demo
          </Button>
        </div>

        {/* Feature Grid */}
        <section className="mt-24 w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-modal border border-border-light dark:border-border-dark p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-btn inline-flex items-center justify-center ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto h-20 px-6 border-t border-border-light dark:border-border-dark flex items-center justify-between text-xs text-slate-550 dark:text-slate-400 z-10">
        <span>&copy; {new Date().getFullYear()} TaskFlow Pro. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
