import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification: (state, action) => action.payload,
    hideNotification: (state, action) => null,
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

let timer;
export const timedNotification = (message) => {
  return async (dispatch) => {
    clearTimeout(timer);
    dispatch(showNotification(message));
    timer = setTimeout(() => dispatch(hideNotification(message)), 5000);
  };
};

export default notificationSlice.reducer;
