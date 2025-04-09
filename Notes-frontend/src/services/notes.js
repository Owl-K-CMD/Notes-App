
import axios from 'axios'
const baseUrl = '/api/notes';


console.log('Base URL is:', baseUrl);


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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