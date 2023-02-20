import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_BOOKS } from '../queries';
import BookList from './BookList';

const Books = ({ books }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    setGenres([
      ...new Set(books.data?.allBooks.map((b) => b.genres).flat()),
      '',
    ]);
    filteredBooks.refetch({ genre: '' });
  }, [books]);

  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  const filterBooks = (genre) => {
    setSelectedGenre(genre);
    filteredBooks.refetch({ genre });
  };

  if (books.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>books</h2>

      {genres.map((genre) => (
        <button key={genre} onClick={() => filterBooks(genre)}>
          {genre || 'all genres'}
        </button>
      ))}

      <h3>books filtered by genre: {selectedGenre || 'all genres'}</h3>

      {filteredBooks.loading ? (
        <div>loading...</div>
      ) : (
        <BookList books={filteredBooks.data?.allBooks} />
      )}
    </div>
  );
};

export default Books;
