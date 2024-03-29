import PropTypes from 'prop-types';
import { useState } from 'react';

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const blogStyle = {
    backgroundColor: '#f3f3f3',
    padding: '3px 10px',
    borderRadius: '20px',
    marginBottom: '1rem',
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="blog" style={blogStyle}>
      <p>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </p>
      {visible && (
        <div style={showWhenVisible} className="blogContent">
          <p>{blog.url}</p>
          <p>
            likes: {blog.likes} <button onClick={() => updateBlog(blog)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {blog.user.username === user.username && <button onClick={() => removeBlog(blog)}>delete</button>}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
