import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = [...blogs].sort((a, z) => z.likes - a.likes);

  const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const itemStyle = {
    backgroundColor: '#f3f3f3',
    padding: '10px',
    borderRadius: '5px',
  };

  return (
    <div style={listStyle}>
      {sortedBlogs.map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`} style={itemStyle}>
          {blog.title}
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
