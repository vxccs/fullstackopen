import { Link, Route, Routes } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

function App() {
  return (
    <div>
      <div>
        <Link to="/">
          <button type="button">authors</button>
        </Link>
        <Link to="/books">
          <button type="button">books</button>
        </Link>
        <Link to="/newbook">
          <button type="button">new book</button>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook />} />
      </Routes>
    </div>
  );
}

export default App;
