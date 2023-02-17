import { useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import BlogList from './components/BlogList';
import {
  getUserFromLocalStorage,
  logoutUser,
} from './reducers/loggedUserReducer';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getUserFromLocalStorage());
  }, [dispatch]);

  const blogFormRef = useRef();

  return (
    <div>
      <h1>{user ? 'bloglist' : 'log in to application'}</h1>
      <Notification />
      {user ? (
        <div>
          <p>
            <em>{user.name}</em> logged in{' '}
            <button onClick={() => dispatch(logoutUser())}>logout</button>
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2>create new</h2>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>

          <h2>blogs</h2>
          <BlogList user={user} />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;
