import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import './styles/index.css'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

import { showNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('BlogLoggedinUser'))
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((currentBlog, nextBlog) =>
        currentBlog.likes > nextBlog.likes
          ? -1
          : currentBlog.likes === nextBlog
            ? 0
            : 1
      )
      setBlogs(sortedBlogs)
    })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      // Set token in app and localStorage and clear out form
      window.localStorage.setItem('BlogLoggedinUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exceptions) {
      console.log(exceptions)
      const error = 'wrong username or password'
      dispatch(showNotification({ message: error, error: true }))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('BlogLoggedinUser')
    blogService.setToken(null)
  }

  // On Logout

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
          <br></br>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
          <br></br>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  // On Login

  const blogFormRef = useRef()

  const handleBlogSubmit = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog)
      setBlogs([...blogs, addedBlog])
      dispatch(showNotification({
        message: `a new blog ${addedBlog.title} by ${addedBlog.author}`,
        error: false
      }))
      console.log(blogFormRef)
      blogFormRef.current.handleVisibility()
    } catch (exceptions) {
      console.log(exceptions)
      dispatch(showNotification({ message: 'Incorrect title, author, or url', error: true }))
    }
  }

  const handleBlogUpdate = async (newBlog) => {
    try {
      const updatedBlog = await blogService.update(newBlog)
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
      setBlogs(updatedBlogs)
    } catch (exceptions) {
      console.log(exceptions)
      dispatch(showNotification({ message: 'An error has occured in the errors', error: true }))
    }
  }

  const handleBlogDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        const deletedBlog = await blogService.deleteReq(blog.id)
        const updatedBlogs = blogs.filter((blog) => blog.id !== deletedBlog.id)
        setBlogs(updatedBlogs)
      }
    } catch (exceptions) {
      console.log(exceptions)
      dispatch(showNotification({ message: 'An error has occured in the errors', error: true }))
    }
  }

  const blogForm = () => {
    return (
      <div>
        <form onSubmit={handleLogout}>
          <p>{user.name} logged in</p>
          <button type="submit">logout</button>
        </form>

        <h2>create new</h2>
        <Togglable buttonText="new blog" ref={blogFormRef}>
          <BlogForm addBlog={handleBlogSubmit} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={handleBlogUpdate}
            deleteBlog={handleBlogDelete}
            showDelete={blog.user.username === user.username}
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App
