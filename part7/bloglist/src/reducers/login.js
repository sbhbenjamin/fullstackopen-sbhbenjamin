import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return action.data
  case 'TOKEN_LOG_IN':
    return action.data
  case 'LOG_OUT':
    return null
  default:
    return state
  }
}

export const logIn = (credentials) => {
  return async dispatch => {
    const loggedInUser = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedInUser))
    console.log(loggedInUser)

    dispatch({
      type: 'LOG_IN',
      data: loggedInUser
    })
  }
}

export const tokenLogin = (loggedInUser) => {
  return {
    type: 'TOKEN_LOG_IN',
    data: loggedInUser
  }
}

export const logOut = () => {
  return {
    type: 'LOG_OUT',
  }
}

export default loginReducer