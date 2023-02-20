import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../queries';

const LoginForm = ({ setToken, setError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [login, result] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user', token);
      navigate('/');
    }
  }, [result.data]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login({ variables: { username, password } });
      setUsername('');
      setPassword('');
    } catch (error) {
      setError(error.graphQLErrors[0].message);
    }
  };

  return (
    <div>
      <h2>log in to app</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
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
