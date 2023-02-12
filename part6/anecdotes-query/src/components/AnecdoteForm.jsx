import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../requests';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote]);
    },
  });

  const onCreate = (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    newAnecdoteMutation.mutate(content);

    e.target.anecdote.value = '';
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
