import { useEffect, useState } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);
  const [notification, setNotification] = useState(null);

  const showMessage = (message, success) => {
    setNotification({ message, success });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    blogService.setToken(null);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    blogService.setToken(user?.token);
  }, []);

  return (
    <div>
      <h1>{user ? 'blogs' : 'log in to application'}</h1>
      <Notification notification={notification} />
      {user ? (
        <div>
          <p>
            <em>{user.name}</em> logged in <button onClick={handleLogout}>logout</button>
          </p>

          <h2>create new</h2>
          <BlogForm blogs={blogs} setBlogs={setBlogs} showMessage={showMessage} />

          <h2>blogs</h2>
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      ) : (
        <LoginForm setUser={setUser} showMessage={showMessage} />
      )}
    </div>
  );
}

export default App;
