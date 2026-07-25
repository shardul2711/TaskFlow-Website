import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth.js';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, loading, error } = useAuth();
  const [rememberMe, setRememberMe] = useState(localStorage.getItem('rememberedEmail') ? true : false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: localStorage.getItem('rememberedEmail') || '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', data.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      await loginUser(data.email, data.password);
      toast.success('Welcome back to TaskFlow Pro!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-center mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Account Login
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
          Enter your details below to access your workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />

        {/* Password Field */}
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
          })}
        />

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between text-xs mt-1">
          <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-350 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
            />
            Remember Me
          </label>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toast.error('Password recovery is not implemented yet.');
            }}
            className="font-semibold text-primary hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4 py-2.5"
          isLoading={loading}
        >
          Sign In
        </Button>
      </form>

      {/* Register Link */}
      <div className="text-center mt-6 pt-5 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-550 dark:text-slate-400">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Create one now
        </Link>
      </div>
    </div>
  );
};

export default Login;
