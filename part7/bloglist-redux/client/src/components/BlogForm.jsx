import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogsReducer';
import { useField } from '../hooks';
import Togglable from './Togglable';
import { useRef } from 'react';
import FormInput from './Utilities/FormInput';
import Button from './Utilities/Button';

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
      <h2 className="text-xl font-medium">Create New</h2>
      <div className="formDiv">
        <form onSubmit={handleSubmit} className="my-2 flex flex-col gap-2">
          <div>
            Title:
            <FormInput name="Title" spread={title} />
          </div>
          <div>
            Author:
            <FormInput name="Author" spread={author} />
          </div>
          <div>
            URL:
            <FormInput name="URL" spread={url} />
          </div>
          <Button id="create-btn" type="submit" label="create" />
        </form>
      </div>{' '}
    </Togglable>
  );
};

export default BlogForm;
