import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth.js';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordVal = watch('password');

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success('Registration successful! Welcome to TaskFlow Pro.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-center mb-5">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Create Account
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
          Sign up now to start collaborating and tracking your tasks.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
        {/* Name Field */}
        <Input
          label="Full Name"
          type="text"
          placeholder="e.g. John Doe"
          error={errors.name?.message}
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
          })}
        />

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
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
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            validate: {
              hasUpper: (v) => /[A-Z]/.test(v) || 'Must contain at least one uppercase letter',
              hasLower: (v) => /[a-z]/.test(v) || 'Must contain at least one lowercase letter',
              hasDigit: (v) => /\d/.test(v) || 'Must contain at least one number',
              hasSpecial: (v) => /[@$!%*?&]/.test(v) || 'Must contain at least one special character (@$!%*?&)',
            },
          })}
        />

        {/* Confirm Password Field */}
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (v) => v === passwordVal || 'Passwords do not match',
          })}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-3 py-2.5"
          isLoading={loading}
        >
          Create Account
        </Button>
      </form>

      {/* Login Link */}
      <div className="text-center mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-550 dark:text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
