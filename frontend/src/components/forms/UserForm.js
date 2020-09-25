import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const UserForm = ({ action, buttonLabel, onSuccess, onFail, redirect = '/' }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const username = e.target.username.value
    const password = e.target.password.value

    e.target.username.value = ''
    e.target.password.value = ''

    if (username && password) {
      dispatch(action(username, password))
        .then(() => {
          if (onSuccess && 'function' === typeof onSuccess) {
            onSuccess()
          }
          history.push(redirect)
        })
        .catch((err) => {
          if (onFail && 'function' === typeof onFail) {
            onFail(err)
          }
        })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type="text" name="username"></Form.Control>

          <Form.Label>password</Form.Label>
          <Form.Control type="password" name="password"></Form.Control>

          <div style={{ 'paddingTop': '1em' }}>
            <Button variant="primary" id="login-button" type="submit">{buttonLabel}</Button>
            <Button style={{ 'float': 'right' }} variant="danger" onClick={() => history.push('/')}>Cancel</Button>
          </div>
        </Form.Group>
      </form>
    </div>
  )
}

export default UserForm