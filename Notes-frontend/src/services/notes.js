
import axios from 'axios'
const baseUrl = '/api/try';


console.log('Base URL is:', baseUrl);


const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server and will be deleted',
    important: true,
  }
  return request.then(response=> response.data.concat(nonExisting))
}
console.log('now base URL is:', baseUrl);

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response=> response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`,newObject)
  return request.then(response=> response.data)
}

export default {getAll, create, update}