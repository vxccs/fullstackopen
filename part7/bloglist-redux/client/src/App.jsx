import { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import { getUserFromLocalStorage } from './reducers/loggedUserReducer';
import Users from './components/Users';
import { Routes, Route, useMatch } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import { initializeUsers } from './reducers/usersReducer';
import Blog from './components/Blog';
import Navigation from './components/Navigation';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    dispatch(getUserFromLocalStorage());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      {user ? (
        <div>
          <Navigation />

          <h1>bloglist</h1>

          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </div>
      ) : (
        <div>
          <h1>log in to application</h1>
          <LoginForm />
        </div>
      )}
    </div>
  );
}

export default App;
