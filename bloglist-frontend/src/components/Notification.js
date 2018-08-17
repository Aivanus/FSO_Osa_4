import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  if (props.message.length === 0) {
    return null
  }
  return (
    props.status === 'success' ?
      <Message success>
        {props.message}
      </Message> :
      <Message warning>
        {props.message}
      </Message>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    status: state.notification.status
  }
}


export default connect(mapStateToProps)(Notification)