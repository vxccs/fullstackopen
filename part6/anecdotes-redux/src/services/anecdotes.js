import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const createNew = async (anecdote) => {
  const object = {
    content: anecdote,
    votes: 0,
  };
  const { data } = await axios.post(baseUrl, object);
  return data;
};

const updateVote = async (anecdote) => {
  const object = { ...anecdote, votes: anecdote.votes + 1 };
  const { data } = await axios.put(`${baseUrl}/${object.id}`, object);
  return data;
};

export default { getAll, createNew, updateVote };
