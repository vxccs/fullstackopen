import { useEffect, useState, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import Togglable from './components/Togglable';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('currentUser')) || null
  );
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

  const updateBlog = async (blog) => {
    const response = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    setBlogs(blogs.map((b) => (b.id === blog.id ? response : b)));
  };

  const removeBlog = async ({ title, author, id }) => {
    if (window.confirm(`remove blog: "${title}" by ${author}?`)) {
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    blogService.setToken(user?.token);
  }, []);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h1>{user ? 'bloglist' : 'log in to application'}</h1>
      <Notification notification={notification} />
      {user ? (
        <div>
          <p>
            <em>{user.name}</em> logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2>create new</h2>
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              showMessage={showMessage}
              blogFormRef={blogFormRef}
            />
          </Togglable>

          <h2>blogs</h2>
          <div>
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                user={user}
              />
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
