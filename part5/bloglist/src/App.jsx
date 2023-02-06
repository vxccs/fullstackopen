import { useEffect, useState } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);
  const [notification, setNotification] = useState(null);

  const showMessage = (message, success) => {
    setNotification({ message, success });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      blogService.setToken(user.token);

      setUsername('');
      setPassword('');
    } catch (error) {
      console.log('wrong credentials');
      showMessage(error.response.data.error, false);
    }
  };

  const handleLogout = async () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    blogService.setToken(null);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      blogService.setToken(user.token);
    }
  }, []);

  if (!user) {
    return (
      <div>
        <h1>log in to application</h1>
        <Notification notification={notification} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>bloglist</h1>
      <Notification notification={notification} />
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
  );
}

export default App;
