const reducer = (state = { message: '', status: 'success' }, action) => {
  switch (action.type) {
    case 'SET':
      console.log('set')
      return { message: action.message, status: action.status }
    case 'CLEAR':
      console.log('clear')
      return { ...state, message: '' }
    default:
      return state
  }
}

export const notify = (message, status) => {
  console.log('notify')
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      message: message,
      status: status
    })
    setTimeout(() => dispatch({
      type: 'CLEAR'
    }), 5000)

  }
}

export default reducer