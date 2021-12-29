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

export const createNotification = (notification) => {
  return {
    type: 'CREATE_NOTIFICATION',
    data: notification
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export default notificationReducer