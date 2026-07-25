import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarExpanded: true,
    taskModalOpen: false,
    activeModal: null, // 'create' | 'edit' | 'delete' | null
    selectedTaskId: null,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarExpanded = !state.sidebarExpanded;
    },
    setSidebar: (state, action) => {
      state.sidebarExpanded = action.payload;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload.type;
      state.selectedTaskId = action.payload.id || null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.selectedTaskId = null;
    },
  },
});

export const { toggleSidebar, setSidebar, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
