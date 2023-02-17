import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { timedNotification } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const { setUser } = userSlice.actions;

export const getUserFromLocalStorage = () => {
  return async (dispatch) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      dispatch(setUser(currentUser));
      blogService.setToken(currentUser.token);
    }
  };
};

export const loginUser = (userObj) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObj);
      dispatch(setUser(user));
      localStorage.setItem('currentUser', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (error) {
      console.log('wrong credentials');
      dispatch(
        timedNotification({
          message: error.response.data.error,
          success: false,
        })
      );
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(setUser(null));
    localStorage.removeItem('currentUser');
    blogService.setToken(null);
  };
};

export default userSlice.reducer;
