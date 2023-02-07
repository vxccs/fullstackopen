import { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs, showMessage, blogFormRef }) => {
  const emptyBlog = { title: '', author: '', url: '' };

  const [newBlog, setNewBlog] = useState(emptyBlog);

  const createBlog = async (e) => {
    e.preventDefault();

    try {
      const addedBlog = await blogService.create(newBlog);
      setBlogs([...blogs, addedBlog]);
      setNewBlog(emptyBlog);
      showMessage(
        `a new blog '${addedBlog.title}' by ${addedBlog.author} has been added`,
        true
      );
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.log(error);
      showMessage(error.response.data.error, false);
    }
  };

  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog((p) => ({ ...p, title: target.value }))
            }
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog((p) => ({ ...p, author: target.value }))
            }
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="URL"
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog((p) => ({ ...p, url: target.value }))
            }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
