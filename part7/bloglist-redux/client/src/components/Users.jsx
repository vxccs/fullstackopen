import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import usersService from '../services/users';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAll().then((res) => setUsers(res));
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Users</h2>
      {users.map((user) => (
        <Link to={`/users/${user.id}`} key={user.id}>
          <div className="rounded-lg p-2 transition-all hover:bg-indigo-100 hover:pl-3 hover:text-indigo-600">
            <p className="font-medium">{user.name}</p>
            <p>{user.blogs.length} blogs created</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Users;
