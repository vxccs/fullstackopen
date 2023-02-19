import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const User = () => {
  const { id } = useParams();

  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);

  if (!user) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <hr className="my-5" />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-medium">Added blogs:</h3>
        {user.blogs.map((blog) => (
          <Link
            key={blog.id}
            className="rounded-lg p-2 transition-all hover:bg-indigo-100 hover:pl-3 hover:text-indigo-600"
            to={`/blogs/${blog.id}`}
          >
            {blog.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default User;
