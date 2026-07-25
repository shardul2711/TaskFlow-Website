import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  pagination: {
    total: 0,
    pages: 1,
    page: 1,
    limit: 10,
  },
  stats: null, // Holds dashboard statistics
  charts: null, // Holds chart datasets
  recentTasks: [],
  upcomingDeadlines: [],
  loading: false,
  error: null,
  filters: {
    status: '',
    priority: '',
    sortBy: 'newest',
    page: 1,
    search: '',
    archived: false,
  },
  viewMode: 'grid', // 'grid' | 'table' | 'board'
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    taskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload.tasks;
      state.pagination = action.payload.pagination;
      state.error = null;
    },
    setDashboardStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.charts = action.payload.charts;
      state.recentTasks = action.payload.recentTasks;
      state.upcomingDeadlines = action.payload.upcomingDeadlines;
      state.error = null;
    },
    addTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks.unshift(action.payload);
      state.pagination.total += 1;
      state.error = null;
    },
    updateTaskSuccess: (state, action) => {
      state.loading = false;
      const index = state.tasks.findIndex(t => t._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      state.error = null;
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter(t => t._id !== action.payload);
      state.pagination.total = Math.max(0, state.pagination.total - 1);
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    clearTaskError: (state) => {
      state.error = null;
    },
  },
});

export const {
  taskStart,
  taskFailure,
  setTasksSuccess,
  setDashboardStatsSuccess,
  addTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  setFilters,
  resetFilters,
  setViewMode,
  clearTaskError,
} = taskSlice.actions;

export default taskSlice.reducer;
