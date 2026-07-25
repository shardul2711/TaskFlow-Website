import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth.js';
import Sidebar from '../components/common/Sidebar.jsx';
import Navbar from '../components/common/Navbar.jsx';

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();
  const sidebarExpanded = useSelector((state) => state.ui.sidebarExpanded);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      {/* Navigation sidebar */}
      <Sidebar />

      {/* Navigation header */}
      <Navbar />

      {/* Content wrapper */}
      <main
        className={`pt-[72px] min-h-screen transition-all duration-300 ${
          sidebarExpanded ? 'pl-[280px]' : 'pl-[80px]'
        }`}
      >
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
