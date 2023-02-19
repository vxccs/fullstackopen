import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = [...blogs].sort((a, z) => z.likes - a.likes);

  return (
    <div className="flex flex-col gap-2">
      {sortedBlogs.map((blog) => (
        <Link
          key={blog.id}
          className="rounded-lg p-2 transition-all hover:bg-indigo-100 hover:pl-3 hover:text-indigo-600"
          to={`/blogs/${blog.id}`}
        >
          {blog.title}
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
