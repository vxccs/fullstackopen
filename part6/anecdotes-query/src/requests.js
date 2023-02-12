import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

export const createAnecdote = async (anecdote) => {
  const object = { content: anecdote, votes: 0 };
  const { data } = await axios.post(baseUrl, object);
  return data;
};

export const updateAnecdote = async (anecdote) => {
  const object = { ...anecdote, votes: anecdote.votes + 1 };
  const { data } = await axios.put(`${baseUrl}/${anecdote.id}`, object);
  return data;
};
