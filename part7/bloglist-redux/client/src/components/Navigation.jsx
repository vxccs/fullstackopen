import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutUser } from '../reducers/loggedUserReducer';
import { useDispatch } from 'react-redux';

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser);

  const menuStyle = {
    display: 'flex',
    gap: '10px',
    backgroundColor: '#efefef',
    padding: '5px',
  };

  return (
    <div style={menuStyle}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <div>
        <em>{user.name}</em> logged in{' '}
        <button onClick={() => dispatch(logoutUser())}>logout</button>
      </div>
    </div>
  );
};

export default Navigation;
