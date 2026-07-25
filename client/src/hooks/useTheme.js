import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/features/themeSlice.js';

export const useTheme = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return {
    darkMode,
    toggleDarkMode,
  };
};
