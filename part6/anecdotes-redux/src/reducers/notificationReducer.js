import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification: (state, action) => action.payload,
    hideNotification: (state, action) => '',
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

let timer;
export const timedNotification = (notification) => {
  return async (dispatch) => {
    clearTimeout(timer);
    dispatch(showNotification(notification));
    timer = setTimeout(() => dispatch(hideNotification()), 5000);
  };
};

export default notificationSlice.reducer;
