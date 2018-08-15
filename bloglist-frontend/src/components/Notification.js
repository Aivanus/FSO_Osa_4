import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.message.length === 0) {
    return null
  }
  return (
    <div className={props.status}>
      {props.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    status: state.notification.status
  }
}


export default connect(mapStateToProps)(Notification)