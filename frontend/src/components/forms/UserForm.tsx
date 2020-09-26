import React, { FormEvent, useEffect } from 'react'
import { DocumentNode, MutationResult, useMutation } from '@apollo/client'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { useInputField } from '../../hooks/inputField'

interface UserFormProps {
  action: DocumentNode; // mutation to be called for this user form
  buttonLabel: string;
  notify(msg: string, isError: boolean): void;
  onSuccess(data: MutationResult<any>): void; // eslint-disable-line
}

const UserForm: React.FC<UserFormProps> = ({ action, buttonLabel, onSuccess, notify }) => {
  const history = useHistory()
  const { reset: resetUsername, ...username } = useInputField('', true)
  const { reset: resetPassword, ...password } = useInputField('', true)

  const [mutation, result] = useMutation(action, {
    onError: (err) => {
      const errorCode = err.graphQLErrors[0]
      notify(errorCode.message, true)
    }
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const name = username.value
    const pass = password.value

    resetUsername()
    resetPassword()

    mutation({ variables: { username: name, password: pass } })
  }

  useEffect(() => {
    if (result.data) {
      onSuccess(result)
    }
  }, [result.data]) //eslint-disable-line

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type="text" {...username}></Form.Control>

          <Form.Label>password</Form.Label>
          <Form.Control type="password" {...password}></Form.Control>

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