import { useMutation, useQuery, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdote } from './requests';

const App = () => {
  const queryClient = useQueryClient();
  const voteAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      const newAnecdotes = anecdotes.map((a) => (a.id === newAnecdote.id ? newAnecdote : a));
      queryClient.setQueryData('anecdotes', newAnecdotes);
    },
  });

  const { data, isLoading, isError } = useQuery('anecdotes', getAnecdotes, { retry: 1, refetchOnWindowFocus: false });
  if (isLoading) return <div>loading data...</div>;
  if (isError) return <div>anecdote service not available due to problems in server</div>;
  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdoteMutation.mutate(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
