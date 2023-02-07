import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const emptyBlog = { title: '', author: '', url: '' };

  const [newBlog, setNewBlog] = useState(emptyBlog);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBlog(newBlog);
    setNewBlog(emptyBlog);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog((p) => ({ ...p, title: target.value }))}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog((p) => ({ ...p, author: target.value }))}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="URL"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog((p) => ({ ...p, url: target.value }))}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
