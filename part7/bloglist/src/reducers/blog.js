import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'GET_BLOGS':
    return action.data
  case 'UPDATE_BLOG':
    return state
      .map((blog) => (blog.id === action.data.id ? action.data : blog))
      .sort((x, y) => y.likes - x.likes)
  case 'REMOVE_BLOG':
    return state
      .filter((blog) => blog.id !== action.data.id)
  default:
    return state
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    console.log(blog)
    const newBlog = await blogService.create(blog)
    console.log(newBlog)

    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((x, y) => y.likes - x.likes)
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  }
}

export const updateBlog = (updatedBlog) => {
  return async dispatch => {
    await blogService.update(updatedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

export default blogReducer
