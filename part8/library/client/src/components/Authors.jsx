import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';
import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const Authors = () => {
  const [author, setAuthor] = useState('');
  const [birthyear, setBirthyear] = useState('');
  const [datalist, setDatalist] = useState(null);

  const authors = useQuery(ALL_AUTHORS);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const setBorn = (e) => {
    e.preventDefault();

    try {
      updateAuthor({
        variables: { name: author, setBornTo: Number(birthyear) },
      });

      setAuthor('');
      setBirthyear('');
    } catch (error) {
      console.log(error);
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

      <h2>set birthyear</h2>
      <form onSubmit={setBorn}>
        <div>
          name
          <select
            onChange={({ target }) => setAuthor(target.value)}
            defaultValue="default"
          >
            <option disabled value="default">
              select author
            </option>
            {datalist}
          </select>
        </div>
        <div>
          birthyear
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
    </div>
  );
};

export default Authors;
