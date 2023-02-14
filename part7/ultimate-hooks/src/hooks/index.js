import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((res) => setResources(res.data));
  }, [baseUrl]);

  const create = async (resource) => {
    let { data } = await axios.post(baseUrl, resource);
    setResources([...resources, data]);
  };

  const service = {
    create,
  };

  return [resources, service];
};
