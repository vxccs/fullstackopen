import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = (e) => {
    e.preventDefault();
    dispatch(addAnecdote(e.target.anecdote.value));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" type="text" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
