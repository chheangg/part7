import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
      const content = action.payload
      return content
    },
    update(state, action) {
      const content = action.payload
      const updatedBlogs = state.map((blog) =>
        blog.id === content.id ? content : blog
      )
      return updatedBlogs
    },
    deleteABlog(state, action) {
      const content = action.payload
      const updatedBlogs = state.filter((blog) => blog.id !== content.id)
      return updatedBlogs
    }
  }
})

export const { setBlogs, update, deleteABlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const updateBlogs = ({ newBlog }) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(newBlog)
    dispatch(update(updatedBlog))
  }
}

export const deleteBlog = ({ id }) => {
  return async dispatch => {
    const deletedBlog = await blogService.deleteReq(id)
    dispatch(deleteABlog(deletedBlog))
  }
}

export default blogSlice.reducer