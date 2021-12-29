import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getUsers } from '../reducers/users'

const User = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(user => user.id === id)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  if (!user) {
    return null
  } else {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
          ))}
        </ul>
      </div>
    )
  }
}

export default User