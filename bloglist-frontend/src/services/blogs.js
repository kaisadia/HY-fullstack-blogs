import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'},
    method: 'POST'
  }
  try {
    console.log(token)
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken }