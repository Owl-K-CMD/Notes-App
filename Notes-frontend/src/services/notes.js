
import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(`${import.meta.env.VITE_API_URL}/api/notes`)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server and will be deleted',
    important: true,
  }
  return request.then(response=> response.data.concat(nonExisting))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response=> response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`,newObject)
  return request.then(response=> response.data)
}

export default {getAll, create, update}