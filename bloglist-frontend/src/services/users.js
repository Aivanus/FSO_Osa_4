import axios from 'axios'
const baseUrl = '/api/users'

const getById = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getById }