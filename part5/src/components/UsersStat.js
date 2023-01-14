import { useState, useEffect } from 'react'
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
        <thead>
          <th></th>
          <th>blogs created</th>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
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