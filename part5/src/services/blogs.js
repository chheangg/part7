import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log(token)

  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const update = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log(token)

  const request = await axios.put(`${baseUrl}/${newBlog.id} `, newBlog, config)
  return request.data
}

const deleteReq = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log(token)

  const request = await axios.delete(`${baseUrl}/${blogId} `, config)
  return request.data
}

const getBlog = async (blogId) => {
  const response = await axios.get(baseUrl + '/' + blogId)
  return response.data
}

const addComment = async (blogId, message) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl + '/' + blogId + '/comments',{ message }, config)
  return response.data
}

export default { getAll, create, setToken, update, deleteReq, getBlog, addComment }
