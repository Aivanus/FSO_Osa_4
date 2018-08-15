
const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SETUSER':
      console.log('setuser')
      return action.user
    case 'CLEARUSER':
      console.log('clear')
      return null
    default:
      return state
  }
}

export const setUser = (user) => {
  console.log('userSet')
  return async (dispatch) => {
    dispatch({
      type: 'SETUSER',
      user: user
    })
  }
}

export const clearUser = (user) => {
  console.log('userCleared')
  return async (dispatch) => {
    dispatch({
      type: 'CLEARUSER'
    })
  }
}

export default reducer