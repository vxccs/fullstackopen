import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.patch(`${baseUrl}/${id}`, config);
  return response.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };

  await axios.delete(`${baseUrl}/${id}`, config);
};

const comment = async (message, id) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { message },
    config
  );
  return response.data;
};

export default { getAll, create, update, setToken, remove, comment };
