import { useSelector } from 'react-redux';
import { logoutUser } from '../../reducers/loggedUserReducer';
import { useDispatch } from 'react-redux';
import NavItem from './NavItem';
import Button from '../Utilities/Button';

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser);

  return (
    <div className="flex items-center justify-between bg-gray-200 p-4">
      <div>
        <h1 className="font-mono text-xl font-black">bloglist</h1>
      </div>
      <div className="flex items-center gap-3">
        <NavItem text="blogs" path="/" />
        <NavItem text="users" path="/users" />
      </div>
      <div className="flex items-center gap-2">
        <p>
          <em>{user.name}</em> logged in
        </p>
        <Button onClick={() => dispatch(logoutUser())} label="logout" />
      </div>
    </div>
  );
};

export default Navigation;
