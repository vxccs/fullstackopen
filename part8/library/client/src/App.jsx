import { useApolloClient, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommendations from './components/Recommendations';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <h4 style={{ color: 'red' }}>{errorMessage}</h4>;
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user'));
  const [errorMessage, setErrorMessage] = useState('');
  const client = useApolloClient();

  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem('library-user');
    client.resetStore();
  };

  return (
    <div>
      <div>
        <Link to="/">
          <button type="button">authors</button>
        </Link>
        <Link to="/books">
          <button type="button">books</button>
        </Link>
        {!token ? (
          <Link to="/login">
            <button type="button">login</button>
          </Link>
        ) : (
          <>
            <Link to="/newbook">
              <button type="button">new book</button>
            </Link>
            <Link to="/recs">
              <button type="button">recommendations</button>
            </Link>
            <button type="button" onClick={logoutUser}>
              logout
            </button>
          </>
        )}
      </div>

      <Notify errorMessage={errorMessage} />
      <Routes>
        <Route
          path="/"
          element={
            <Authors authors={authors} token={token} setError={notify} />
          }
        />
        <Route path="/books" element={<Books books={books} />} />
        <Route path="/newbook" element={<NewBook setError={notify} />} />
        <Route path="/recs" element={<Recommendations />} />
        <Route
          path="/login"
          element={<LoginForm setToken={setToken} setError={notify} />}
        />
      </Routes>
    </div>
  );
};

export default App;
