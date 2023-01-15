import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { updateBlogs, deleteBlog } from '../reducers/blogReducer'

const BlogDetail = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const blog = useSelector(({ blogs }) => blogs.find(blog => blog.id === params.blogId))

  const handleBlogUpdate = async (newBlog) => {
    try {
      dispatch(updateBlogs({ newBlog }))
    } catch (exceptions) {
      console.log(exceptions)
      dispatch(showNotification({ message: 'An error has occured in the errors', error: true }))
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

  if (!blog) {
    return (
      <div>
        Blog not found
      </div>
    )
  }

  const showDelete = () => user.username === blog.user.username

  return (
    <div>
      <h1>{blog.title}</h1>
      <div className="blog-detail">
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

export default BlogDetail