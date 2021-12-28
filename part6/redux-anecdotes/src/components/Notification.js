import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    marginBottom: 10,
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return props.notification && <div style={style}>{props.notification}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification
