import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BOOKS_GENRE } from '../queries';
import BookList from './BookList';

const Books = ({ books }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all genres');

  useEffect(() => {
    setGenres([
      ...new Set(books.data?.allBooks.map((b) => b.genres).flat()),
      'all genres',
    ]);
    filteredBooks.refetch({ genre: '' });
  }, [books]);

  const filteredBooks = useQuery(BOOKS_GENRE, {
    variables: { genre: selectedGenre === 'all genres' ? '' : selectedGenre },
  });

  if (books.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>books</h2>

      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => {
            setSelectedGenre(genre);
            filteredBooks.refetch({
              genre: genre === 'all genres' ? '' : genre,
            });
          }}
        >
          {genre}
        </button>
      ))}

      <h3>books filtered by genre: {selectedGenre}</h3>

      {filteredBooks.loading ? (
        <div>loading...</div>
      ) : (
        <BookList books={filteredBooks.data?.allBooks} />
      )}
    </div>
  );
};

export default Books;
