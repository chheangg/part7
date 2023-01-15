import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import usersService from '../services/users'

const UserDetail = () => {
  const params = useParams()

  const [user, setUser] = useState()

  useEffect(() => {
    usersService.getUser(params.userId)
      .then((user) => {
        setUser(user)
      })
  }, [])

  console.log(params.userId)
  if (!user) {
    return (
      <div>
        User not found
      </div>
    )
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UserDetail