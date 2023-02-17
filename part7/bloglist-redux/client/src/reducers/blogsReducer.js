import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';
import { timedNotification } from './notificationReducer';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    voteBlog(state, action) {
      const id = action.payload;
      state.find((b) => b.id === id).likes++;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    deleteBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { voteBlog, appendBlog, deleteBlog, setBlogs } =
  blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (blog, blogFormRef) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogsService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(
        timedNotification({
          message: `a new blog '${newBlog.title}' by ${newBlog.author} has been added`,
          success: true,
        })
      );
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.log(error);
      dispatch(
        timedNotification({
          message: error.response.data.error,
          success: false,
        })
      );
    }
  };
};

export const updateBlog = (id) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogsService.update(id);
      dispatch(voteBlog(updatedBlog.id));
    } catch (error) {
      console.log(error);
      dispatch(
        timedNotification({
          message: error.response.data.error,
          success: false,
        })
      );
    }
  };
};

export const removeBlog = ({ title, author, id }) => {
  return async (dispatch) => {
    try {
      if (window.confirm(`remove blog: "${title}" by ${author}?`)) {
        await blogsService.remove(id);
        dispatch(deleteBlog(id));
        dispatch(
          timedNotification({
            message: `"${title}" has been deleted`,
            success: true,
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        timedNotification({
          message: error.response.data.error,
          success: false,
        })
      );
    }
  };
};

export default blogsSlice.reducer;
