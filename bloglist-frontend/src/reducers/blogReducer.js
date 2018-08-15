import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATEBLOG':
      return [...state, action.newBlog]
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
    dispatch({
      type: 'CREATEBLOG',
      newBlog: newBlog
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