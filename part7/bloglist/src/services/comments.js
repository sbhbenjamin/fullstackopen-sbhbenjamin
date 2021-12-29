import axios from 'axios'
const baseUrl = '/api/comments'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log(token)
}

const removeToken = () => {
  token = null
}

const getBlogComments = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createComment = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('from service', newObject)
  const response = await axios.post(baseUrl, newObject, config)
  console.log('from service', response)
  return response.data
}

export default { setToken, removeToken, getBlogComments, createComment }