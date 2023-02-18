import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogsReducer';
import { useField } from '../hooks';
import Togglable from './Togglable';
import { useRef } from 'react';

const BlogForm = () => {
  const dispatch = useDispatch();

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const blogFormRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      addBlog(
        { title: title.value, author: author.value, url: url.value },
        blogFormRef
      )
    );
  };

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <h2>create new</h2>
      <div className="formDiv">
        <form onSubmit={handleSubmit}>
          <div>
            title:
            <input id="title" name="Title" {...title} />
          </div>
          <div>
            author:
            <input id="author" name="Author" {...author} />
          </div>
          <div>
            url:
            <input id="url" name="URL" {...url} />
          </div>
          <button id="create-btn" type="submit">
            create
          </button>
        </form>
      </div>{' '}
    </Togglable>
  );
};

export default BlogForm;
