import React from 'react';

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" name="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
