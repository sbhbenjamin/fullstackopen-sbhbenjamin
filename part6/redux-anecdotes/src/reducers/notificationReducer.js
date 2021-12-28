let tid = null

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  if (tid) {
    clearTimeout(tid)
    tid = null
  }
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: message,
    })

    tid = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, timeout * 1000)
  }
}

export default notificationReducer
