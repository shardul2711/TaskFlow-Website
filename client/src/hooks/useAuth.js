import { useSelector, useDispatch } from 'react-redux';
import { authStart, authSuccess, authFailure, logout, updateUserSuccess } from '../store/features/authSlice.js';
import authService from '../services/authService.js';
import { useCallback } from 'react';

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const loginUser = useCallback(async (email, password) => {
    dispatch(authStart());
    try {
      const response = await authService.login(email, password);
      dispatch(authSuccess({ user: response.data.user, token: response.data.token }));
      return response.data.user;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      dispatch(authFailure(message));
      throw new Error(message);
    }
  }, [dispatch]);

  const registerUser = useCallback(async (name, email, password) => {
    dispatch(authStart());
    try {
      const response = await authService.register(name, email, password);
      dispatch(authSuccess({ user: response.data.user, token: response.data.token }));
      return response.data.user;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      dispatch(authFailure(message));
      throw new Error(message);
    }
  }, [dispatch]);

  const logoutUser = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn("Logout request failed, continuing local logout");
    } finally {
      dispatch(logout());
    }
  }, [dispatch]);

  const updateProfile = useCallback(async (userData) => {
    dispatch(authStart());
    try {
      const response = await authService.updateProfile(userData);
      dispatch(updateUserSuccess(response.data.user));
      return response.data.user;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Update failed';
      dispatch(authFailure(message));
      throw new Error(message);
    }
  }, [dispatch]);

  return {
    ...authState,
    loginUser,
    registerUser,
    logoutUser,
    updateProfile,
  };
};
