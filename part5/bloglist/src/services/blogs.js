import axios from 'axios';
const baseUrl = '/api/blogs';

let token;

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

const update = async (id, newObject) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

export default { getAll, create, update, setToken };
