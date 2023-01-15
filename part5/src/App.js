import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './styles/index.css'

import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import UsersStat from './components/UsersStat'
import NavBar from './components/NavBar'

import blogService from './services/blogs'
import Togglable from './components/Togglable'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'

import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, setBlogs } from './reducers/blogReducer'
import { setUser, initializeUser } from './reducers/userReducer'
import { Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('BlogLoggedinUser'))
    if (user) {
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => {
  //     const sortedBlogs = blogs.sort((currentBlog, nextBlog) =>
  //       currentBlog.likes > nextBlog.likes
  //         ? -1
  //         : currentBlog.likes === nextBlog
  //           ? 0
  //           : 1
  //     )
  //     setBlogs(sortedBlogs)
  //   })
  // }, [])
  //
  // OLD CODE

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  const handleLogin = (event) => {
    event.preventDefault()
    try {
      dispatch(initializeUser({ username, password }))
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
    dispatch(setUser(null))
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
      dispatch(setBlogs([...blogs, addedBlog]))
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

  const BlogFormContainer = () => {
    return (
      <div>
        <h2>create new</h2>
        <Togglable buttonText="new blog" ref={blogFormRef}>
          <BlogForm addBlog={handleBlogSubmit} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    )
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />

        {user === null && loginForm()}
      </div>
    )
  }

  return (
    <div>
      <NavBar user={user} handleLogout={handleLogout}>
        <Link to='/'>Blogs</Link>
        <Link to='/users'>Users</Link>
      </NavBar>
      <h2>blogs</h2>
      <Notification />
      <Routes>
        <Route index element={<BlogFormContainer />} />
        <Route path='/users' element={<UsersStat />} />
        <Route path='/users/:userId' element={<UserDetail />} />
        <Route path='/blogs/:blogId' element={<BlogDetail />} />
      </Routes>
    </div>
  )
}

export default App
