import blogService from '../services/blogs'
import userService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATEBLOG':
      return [...state, { ...action.newBlog, user: action.user }]
    case 'REMOVEBLOG':
      return state.filter(b => b._id !== action.id)
    case 'UPDATEBLOG': {
      const old = state.filter(b => b._id !== action.id)
      const liked = state.find(b => b._id === action.id)
      return [...old, { ...liked, likes: liked.likes + 1 }]
    }
    default:
      return state
  }
}

export const blogCreate = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    const user = await userService.getById(newBlog.user)
    dispatch({
      type: 'CREATEBLOG',
      newBlog: newBlog,
      user: user
    })
  }
}

export const blogUpdate = (id, blog) => {
  return async (dispatch) => {
    await blogService.update(id, blog)
    dispatch({
      type: 'UPDATEBLOG',
      id: id
    })
  }
}

export const blogRemove = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVEBLOG',
      id: id
    })
  }
}

export const blogInit = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export default reducer