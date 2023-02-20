import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';
import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';

const Authors = ({ authors, token, setError }) => {
  const [author, setAuthor] = useState('default');
  const [birthyear, setBirthyear] = useState('');
  const [datalist, setDatalist] = useState(null);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.map((a) =>
            a.name === response.data.editAuthor.name
              ? { ...a, born: response.data.editAuthor.born }
              : a
          ),
        };
      });
    },
  });

  const setBorn = async (e) => {
    e.preventDefault();

    try {
      await updateAuthor({
        variables: { name: author, setBornTo: Number(birthyear) },
      });

      setAuthor('default');
      setBirthyear('');
    } catch (error) {
      setError(error.graphQLErrors[0].message);
    }
  };

  useEffect(() => {
    const data = authors.data?.allAuthors
      .map((a) => a.name)
      .map((n, i) => (
        <option key={i + n} value={n}>
          {n}
        </option>
      ));
    setDatalist(data);
  }, [authors]);

  if (authors.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token && (
        <>
          <h2>set birthyear</h2>
          <form onSubmit={setBorn}>
            <div>
              name
              <select
                onChange={({ target }) => setAuthor(target.value)}
                value={author}
              >
                <option disabled value="default">
                  select author
                </option>
                {datalist}
              </select>
            </div>
            <div>
              born
              <input
                type="number"
                value={birthyear}
                onChange={({ target }) => setBirthyear(target.value)}
              />
            </div>
            <div>
              <button type="submit">update author</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Authors;
