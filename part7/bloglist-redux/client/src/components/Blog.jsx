import { useDispatch, useSelector } from 'react-redux';
import { removeBlog, updateBlog } from '../reducers/blogsReducer';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser);

  const { id } = useParams();

  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return null;

  return (
    <div className="blog">
      <h2>
        "{blog.title}" by {blog.author}
      </h2>
      <div className="blogContent">
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes{' '}
          <button onClick={() => dispatch(updateBlog(blog.id))}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        {blog.user.username === user.username && (
          <button onClick={() => dispatch(removeBlog(blog))}>delete</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
