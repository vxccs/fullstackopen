import PropTypes from 'prop-types';
import { useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';

const LoginForm = ({ setUser, showMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      blogService.setToken(user.token);

      setUsername('');
      setPassword('');
    } catch (error) {
      console.log('wrong credentials');
      showMessage(error.response.data.error, false);
    }
  };

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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
};

export default LoginForm;
