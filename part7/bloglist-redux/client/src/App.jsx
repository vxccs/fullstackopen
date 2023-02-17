import { useEffect, useRef, useState } from 'react';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import BlogList from './components/BlogList';

function App() {
  const dispatch = useDispatch();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('currentUser')) || null
  );

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    blogService.setToken(null);
  };

  useEffect(() => {
    dispatch(initializeBlogs());
    blogService.setToken(user?.token);
  }, []);

  const blogFormRef = useRef();

  return (
    <div>
      <h1>{user ? 'bloglist' : 'log in to application'}</h1>
      <Notification />
      {user ? (
        <div>
          <p>
            <em>{user.name}</em> logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2>create new</h2>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>

          <h2>blogs</h2>
          <BlogList user={user} />
        </div>
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  );
}

export default App;
