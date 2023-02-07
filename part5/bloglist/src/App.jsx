import { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

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

  const createBlog = async (blog) => {
    try {
      const addedBlog = await blogService.create(blog);
      setBlogs([...blogs, addedBlog]);
      showMessage(`a new blog '${addedBlog.title}' by ${addedBlog.author} has been added`, true);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.log(error);
      showMessage(error.response.data.error, false);
    }
  };

  const updateBlog = async ({ id }) => {
    try {
      const response = await blogService.update(id);
      setBlogs(blogs.map((b) => (b.id === id ? response : b)));
    } catch (error) {
      console.log(error);
      showMessage(error.response.data.error, false);
    }
  };

  const removeBlog = async ({ title, author, id }) => {
    try {
      if (window.confirm(`remove blog: "${title}" by ${author}?`)) {
        await blogService.remove(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        showMessage(`"${title}" has been deleted`, true);
      }
    } catch (error) {
      console.log(error);
      showMessage(error.response.data.error, false);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    blogService.setToken(user?.token);
  }, []);

  const blogFormRef = useRef();
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h1>{user ? 'bloglist' : 'log in to application'}</h1>
      <Notification notification={notification} />
      {user ? (
        <div>
          <p>
            <em>{user.name}</em> logged in <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2>create new</h2>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          <h2>blogs</h2>
          <div>
            {sortedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
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
