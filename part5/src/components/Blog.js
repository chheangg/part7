import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { updateBlogs, deleteBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog, showDelete }) => {
  const dispatch = useDispatch()
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenVisibile = { display: showDetail ? '' : 'none' }

  const handleBlogUpdate = async (newBlog) => {
    try {
      dispatch(updateBlogs({ newBlog }))
    } catch (exceptions) {
      console.log(exceptions)
      dispatch(showNotification({ message: 'An er ror has occured in the errors', error: true }))
    }
  }

  const handleBlogDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        dispatch(deleteBlog({ id: blog.id }))
      }
    } catch (exceptions) {
      console.log(exceptions)
      dispatch(showNotification({ message: 'An error has occured in the errors', error: true }))
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button
          className="expand-blog"
          onClick={() => setShowDetail(!showDetail)}
        >
          view
        </button>
      </div>
      <div style={showWhenVisibile} className="blog-detail">
        <div>{blog.url}</div>
        <div>
          <div className="likes">likes {blog.likes}</div>
          <button
            className="like-btn"
            onClick={() =>
              handleBlogUpdate({ ...blog, user: blog.user.id, likes: blog.likes + 1 })
            }
          >
            Like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {showDelete ? (
          <button
            className="remove-btn"
            onClick={() => handleBlogDelete({ ...blog })}
          >
            remove
          </button>
        ) : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  showDelete: PropTypes.bool.isRequired,
}

export default Blog
