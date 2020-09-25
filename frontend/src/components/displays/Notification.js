import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, isError } = useSelector(state => state.notify)

  if(!message){
    return null
  }

  const notificationStyle = {
    'color': isError ? 'red' : 'green',
    'background': 'lightgrey',
    'fontSize': '20px',
    'borderStyle': 'solid',
    'borderRadius': '5px',
    'padding': '10px',
    'marginTop': '6vh',
    'marginBottom': '10px',
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification