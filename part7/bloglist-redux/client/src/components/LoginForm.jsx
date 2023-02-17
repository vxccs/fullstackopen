import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/loggedUserReducer';
import { useField } from '../hooks';

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField('text');
  const password = useField('password');

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: username.value, password: password.value }));
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" name="Username" {...username} />
        </div>
        <div>
          password
          <input id="password" name="Password" {...password} />
        </div>
        <button id="login-btn" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
