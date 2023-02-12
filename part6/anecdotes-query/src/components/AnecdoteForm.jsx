import { useMutation, useQueryClient } from 'react-query';
import { timedNotification, useNotificationDispatch } from '../NotificationContext';
import { createAnecdote } from '../requests';

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote]);

      timedNotification(dispatch, `added '${newAnecdote.content}'`);
    },
    onError: (e) => {
      timedNotification(dispatch, `${e.response.data.error}`);
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
