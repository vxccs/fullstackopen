import { useMutation, useQueryClient } from 'react-query';
import { useTimedNotification } from '../NotificationContext';
import { createAnecdote } from '../requests';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notifyMessage = useTimedNotification();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote]);

      notifyMessage(`added '${newAnecdote.content}'`);
    },
    onError: (e) => {
      notifyMessage(`${e.response.data.error}`);
    },
  });

  const onCreate = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';

    newAnecdoteMutation.mutate(content);
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
