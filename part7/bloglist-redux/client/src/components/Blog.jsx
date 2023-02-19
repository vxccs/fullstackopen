import { useDispatch, useSelector } from 'react-redux';
import { removeBlog, updateBlog, addComment } from '../reducers/blogsReducer';
import { useParams } from 'react-router-dom';
import { useField } from '../hooks/index';
import FormInput from './Utilities/FormInput';
import Button from './Utilities/Button';

const Blog = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser);

  const { id } = useParams();

  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);

  const comment = useField('text');

  if (!blog)
    return (
      <div className="grid h-96 w-full place-content-center text-center text-gray-400">
        Blog doesn't exist or has been deleted.
      </div>
    );

  return (
    <div className="blog">
      <h2 className="text-2xl font-bold">
        "{blog.title}" by {blog.author}
      </h2>
      <div className="blogContent">
        <a
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          className="transition-all hover:text-indigo-600"
        >
          {blog.url}
        </a>
        <p>
          {blog.likes} likes{' '}
          <button
            className="text-indigo-500 underline decoration-indigo-500 hover:text-indigo-700 hover:decoration-indigo-700"
            onClick={() => dispatch(updateBlog(blog.id))}
          >
            Like
          </button>
        </p>
        <p>
          added by: <em>{blog.user.name}</em>
        </p>
        {blog.user.username === user.username && (
          <button
            className="text-indigo-500 underline decoration-indigo-500 hover:text-indigo-700 hover:decoration-indigo-700"
            onClick={() => dispatch(removeBlog(blog))}
          >
            Delete
          </button>
        )}
      </div>

      <hr className="my-5" />

      <div>
        <h3 className="mb-3 text-xl font-medium">Comments</h3>
        <div className="flex gap-2">
          <FormInput spread={comment} name="Comment" />
          <Button
            onClick={() => dispatch(addComment(comment.value, blog))}
            label="Add comment"
          />
        </div>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id} className="my-5 border-b border-b-gray-200">
              {comment.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
