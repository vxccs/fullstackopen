import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogsReducer';

const BlogForm = ({ blogFormRef }) => {
  const emptyBlog = { title: '', author: '', url: '' };

  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState(emptyBlog);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addBlog(newBlog, blogFormRef));
    setNewBlog(emptyBlog);
  };

  return (
    <div className="formDiv">
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id="title"
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
            id="author"
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
            id="url"
            type="text"
            name="URL"
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog((p) => ({ ...p, url: target.value }))
            }
          />
        </div>
        <button id="create-btn" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
