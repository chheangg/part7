import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import usersService from '../services/users'

const UsersStat = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService.getAll()
      .then((users) => {
        setUsers(users)
      })
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <thead></thead>
          <thead>blogs created</thead>
        </tr>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersStat