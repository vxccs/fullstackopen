import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/loggedUserReducer';
import { useField } from '../hooks';
import FormInput from './Utilities/FormInput';
import Button from './Utilities/Button';

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
      <form onSubmit={handleLogin} className="flex flex-col gap-2 text-center">
        <div className="text-left">
          Username
          <FormInput name="Username" spread={username} />
        </div>
        <div className="text-left">
          Password
          <FormInput name="Password" spread={password} />
        </div>
        <div className="w-full">
          <Button type="submit" label="Login" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
