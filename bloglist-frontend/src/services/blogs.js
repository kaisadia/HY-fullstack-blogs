import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  };
  try {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
    method: 'DELETE',
  };
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getAll, create, update, setToken, remove };
