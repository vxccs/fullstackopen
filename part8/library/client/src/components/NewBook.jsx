import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_BOOKS, ALL_AUTHORS, CREATE_BOOK } from '../queries';
import { useNavigate } from 'react-router-dom';

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: [...allBooks, response.data.addBook],
        };
      });
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors
            .map((a) => a.name)
            .includes(response.data.addBook.author.name)
            ? allAuthors
            : [...allAuthors, response.data.addBook.author],
        };
      });
    },
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await createBook({
        variables: { title, author, published: Number(published), genres },
      });

      setTitle('');
      setPublished('');
      setAuthor('');
      setGenres([]);
      setGenre('');
      navigate('/books');
    } catch (error) {
      console.log(error);
      setError(error.graphQLErrors[0].message);
    }
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <h2>create new book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
