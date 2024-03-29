import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { ALL_BOOKS, CURRENT_USER } from '../queries';
import BookList from './BookList';

const Recommendations = () => {
  const currentUser = useQuery(CURRENT_USER);

  useEffect(() => {
    filteredBooks.refetch({ genre: currentUser.data?.me.favouriteGenre });
  }, [currentUser]);

  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: { genre: currentUser.data?.me.favouriteGenre },
  });

  if (currentUser.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>recommendations</h2>

      <h3>
        books in your favourite genre: {currentUser.data?.me.favouriteGenre}
      </h3>

      {filteredBooks.loading ? (
        <div>loading...</div>
      ) : (
        <BookList books={filteredBooks.data?.allBooks} />
      )}
    </div>
  );
};

export default Recommendations;
