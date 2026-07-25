import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice.js';
import taskReducer from './features/taskSlice.js';
import themeReducer from './features/themeSlice.js';
import uiReducer from './features/uiSlice.js';
import notificationReducer from './features/notificationSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    theme: themeReducer,
    ui: uiReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Turn off serializability check for Date/File objects in state if passed
    }),
});
