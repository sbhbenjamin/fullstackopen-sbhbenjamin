import 'bulma/css/bulma.min.css'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import commentService from './services/comments'
import Togglable from './components/Togglable'
import { getBlogs, createBlog, updateBlog, removeBlog } from './reducers/blog'
import { createNotification, removeNotification } from './reducers/notification'
import { logIn, logOut, tokenLogin } from './reducers/login'
import UserList from './components/UserList'
import User from './components/User'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message.success) {
    return <div className="notification is-success is-light">{message.message}</div>
  } else {
    return <div className="notification is-danger is-light">{message.message}</div>
  }
}

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.login)
  const blogFormRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(getBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(tokenLogin(user))
      blogService.setToken(user.token)
      commentService.setToken(user.token)
    }
  }, [])

  const dispatchSuccessNotification = (message) => {
    dispatch(createNotification({
      success: true,
      message: message
    }))

    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const dispatchErrorNotification = (message) => {
    dispatch(createNotification({
      error: true,
      message: message
    }))

    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(logIn({
        username,
        password
      }))
      setUsername('')
      setPassword('')

      dispatchSuccessNotification('Successfully logged in')
    } catch (exception) {
      dispatchErrorNotification(`Wrong credentials: ${exception}`)
    }
  }

  const handleLogout = () => {
    dispatch(logOut())
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.removeToken()
    commentService.removeToken()
  }

  const handleCreateBlog = ({ title, author, url }) => {
    try {
      const newBlog = { title, author, url }
      dispatch(createBlog(newBlog))
      dispatch(getBlogs())
      dispatchSuccessNotification(`a new blog ${title} by ${author} added`)
    } catch (exception) {
      dispatchErrorNotification(`Error creating blog: ${exception}`)
    }
  }

  const handleUpdateBlog = (updatedBlog) => {
    try {
      dispatch(updateBlog(updatedBlog))
      dispatchSuccessNotification(`Successfully updated ${updatedBlog.title} by ${updatedBlog.author}`)
    } catch (exception) {
      dispatchErrorNotification(`Error updating blog: ${exception}`)
    }
  }

  const handleRemoveBlog = (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        dispatch(removeBlog(blog))
        dispatchSuccessNotification(`Successfully deleted ${blog.title}`)
      }
    } catch (exception) {
      dispatchErrorNotification(`Error deleting ${blog.title}: ${exception}`)
    }
  }

  return (
    <Router>
      <div className='content ml-6 mr-6 mt-3 mb-3'>
        <div>
          <nav className='navbar'>
            <div className='navbar-menu'>
              <div className='navbar-start'>
                <Link to="/" className='navbar-item'>blog</Link>
                <Link to="/users" className='navbar-item'>users</Link>
              </div>
              <div className='navbar-end'>
                <div className='navbar-item'>
                  {user && <div>
                    <div className="buttons">
                      <span className='mr-5'>{user.name} logged in.</span><button className='button is-danger' onClick={handleLogout}>Logout</button>
                    </div>
                  </div>}
                </div>
              </div>
            </div>
          </nav>
          <h2 className='is-size-2'>blog app</h2>
        </div>
        <div>
          <Notification message={notification} />
          {user === null && (
            <>
              <LoginForm
                handleSubmit={handleLogin}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                username={username}
                password={password}
              />
            </>)}
          <Switch>
            <Route path='/blogs/:id'>
              <Blog
                blogs={blogs}
                handleUpdate={handleUpdateBlog}
                handleRemove={handleRemoveBlog}
              />
            </Route>
            <Route path='/users/:id'>
              <User />
            </Route>
            <Route path='/users'>
              <UserList />
            </Route>
            <Route path='/'>
              <div>
                {user !== null && (
                  <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <BlogForm handleCreateBlog={handleCreateBlog} />
                  </Togglable>
                )}
                <table>

                  <tbody>
                    <tr>
                      <th>blog posts</th>
                    </tr>
                    {blogs.map((blog) => (
                      <tr key={blog.id}>
                        <td><Link to={`blogs/${blog.id}`}>{blog.title}</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>

  )
}

export default App
