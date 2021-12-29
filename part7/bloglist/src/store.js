import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore, combineReducers  } from 'redux'
import blogReducer from './reducers/blog'
import notificationReducer from './reducers/notification'
import loginReducer from './reducers/login'
import usersReducer from './reducers/users'
import commentReducer from './reducers/comment'

const reducers = combineReducers({
  blog: blogReducer,
  notification: notificationReducer,
  login: loginReducer,
  users: usersReducer,
  comments: commentReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store