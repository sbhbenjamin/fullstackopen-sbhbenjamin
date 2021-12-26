import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message.success) {
    return <div className="success">{message.message}</div>
  } else {
    return <div className="error">{message.message}</div>
  }
}

const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((x, y) => y.likes - x.likes)
      setBlogs(sortedBlogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setNotification({
        success: true,
        message: 'Successfully logged in',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({
        error: true,
        message: 'Wrong credentials',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.removeToken()
  }

  const handleCreateBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs(blogs.concat(blog))

      setNotification({
        success: true,
        message: `a new blog ${title} by ${author} added`,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({
        error: true,
        message: 'Error creating blog',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleUpdateBlog = async (updatedBlog) => {
    console.log(updatedBlog)
    try {
      const res = await blogService.update(updatedBlog)
      const newBlogs = blogs.map((blog) => (blog.id === res.id ? res : blog))
      setBlogs(newBlogs)
      setNotification({
        success: true,
        message: `Successfully updated ${updatedBlog.title} by ${updatedBlog.author}`,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setNotification({
        error: true,
        message: `Error updating blog: ${exception}`,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleRemoveBlog = async (blog) => {
    console.log(blog)
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog)
        const newBlogs = blogs.filter((b) => b !== blog)
        setBlogs(newBlogs)
      }
    } catch (exception) {
      setNotification({
        error: true,
        message: `Error deleting ${blog.title}: ${exception}`,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={notification} />
      <h2>log in to application</h2>
      {user === null ? (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      ) : (
        <div>
          {user.name} logged in. <button data-testid='logout-button' id='logout-button' onClick={handleLogout}>Logout</button>
        </div>
      )}

      <h2>create new</h2>
      {user !== null && (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm handleCreateBlog={handleCreateBlog} />
        </Togglable>
      )}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={handleUpdateBlog}
          handleRemove={handleRemoveBlog}
        />
      ))}
    </div>
  )
}

export default App
