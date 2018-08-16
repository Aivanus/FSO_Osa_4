import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'


const reducer = combineReducers({
  notification: notificationReducer,
  loggedUser: loggedUserReducer,
  blogs: blogReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
