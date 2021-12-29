import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_USERS':
    return action.data
  case 'GET_USER':
    return action.data
  default:
    return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

export const getUserById = (id) => {
  return async dispatch => {
    const user = await userService.getById(id)
    dispatch({
      type: 'GET_USER',
      data: user
    })
  }
}


export default usersReducer