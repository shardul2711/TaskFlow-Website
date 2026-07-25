import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now().toString(),
        message: action.payload.message,
        type: action.payload.type || 'info', // 'success' | 'error' | 'warning' | 'info'
        timestamp: new Date().toISOString(),
        read: false,
      });
      // Limit to 20 notifications in memory
      if (state.notifications.length > 20) {
        state.notifications.pop();
      }
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => {
        n.read = true;
      });
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, markAsRead, markAllAsRead, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
