import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store.js';
import { Spinner } from './components/common/Loader.jsx';
import { useTheme } from './hooks/useTheme.js';

// Layouts
import AuthLayout from './layouts/AuthLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';

// Lazy loaded page components for optimal performance
const Landing = lazy(() => import('./pages/Landing.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Tasks = lazy(() => import('./pages/Tasks.jsx'));
const TaskDetails = lazy(() => import('./pages/TaskDetails.jsx'));
const CreateTask = lazy(() => import('./pages/CreateTask.jsx'));
const EditTask = lazy(() => import('./pages/EditTask.jsx'));
const Analytics = lazy(() => import('./pages/Analytics.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// Theme helper component to apply the body classes
const ThemeInitializer = ({ children }) => {
  const { darkMode } = useTheme();
  return <>{children}</>;
};

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ThemeInitializer>
          <BrowserRouter>
            <Suspense fallback={<Spinner size="large" className="min-h-screen" />}>
              <Routes>
                {/* Public Marketing Page */}
                <Route path="/" element={<Landing />} />

                {/* Public Auth Routes wrapped in AuthLayout */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>

                {/* Protected Dashboard/App Routes wrapped in DashboardLayout */}
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/tasks/new" element={<CreateTask />} />
                  <Route path="/tasks/:id" element={<TaskDetails />} />
                  <Route path="/tasks/edit/:id" element={<EditTask />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>

                {/* 404 Route */}
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#334155',
                color: '#fff',
                fontSize: '13px',
                borderRadius: '8px',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </ThemeInitializer>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
