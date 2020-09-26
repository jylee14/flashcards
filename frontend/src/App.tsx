import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import UserForm from './components/forms/UserForm';
import LandingPage from './components/displays/LandingPage'
import Notification from './components/displays/Notification'
import GreetingBanner from './components/displays/GreetingBanner';

import { CREATE_USER, LOGIN } from './queries';
import { MutationResult } from '@apollo/client';

interface User {
  username: string | null;
  token: string | null;
}

function App() {
  const history = useHistory()
  const [user, setUser] = useState<User>({ username: null, token: null })
  const [message, setMesssage] = useState('')
  const [isError, setIsError] = useState(false)

  const notify = (msg: string, isError = false) => {
    setMesssage(msg)
    setIsError(isError)

    setTimeout(() => {
      setMesssage('')
      setIsError(false)
    }, 2500)
  }

  const loginOnSuccess = (result: MutationResult<any>) => { // eslint-disable-line
    if (result.data) {
      const username = result.data.login.username
      const token = result.data.login.value

      const user = { username, token }
      localStorage.setItem('user-session', JSON.stringify(user))
      setUser(user)
      history.push('/')
    }
  }

  const createOnSuccess = (result: MutationResult<any>) => { // eslint-disable-line
    if (result.data.createUser) {
      notify('Successfully created a new profile!\nPlease log in')
      history.push('/login')
    }
  }

  const logout = () => {
    setUser({
      username: null,
      token: null
    })
    localStorage.removeItem('user-token')
  }

  useEffect(() => {
    const userSession = localStorage.getItem('user-session')
    if (userSession) {
      const parsedUser = JSON.parse(userSession)
      if (userSession && parsedUser.username && parsedUser.token) {
        setUser(parsedUser)
      }
    }
  }, [])

  return (<div>
    <GreetingBanner username={user?.username} logout={logout} />
    <div className="container">
      <Notification message={message} isError={isError} />
      <Switch>
        <Route path="/create">
          <UserForm
            action={CREATE_USER}
            buttonLabel="Create"
            onSuccess={createOnSuccess}
            notify={notify}
          />
        </Route>
        <Route path="/login">
          <UserForm
            action={LOGIN}
            buttonLabel="Login"
            onSuccess={loginOnSuccess}
            notify={notify}
          />
        </Route>
        <Route path="/">
          {user.username && user.token ? <div>Hello</div> : <LandingPage></LandingPage>}
        </Route>
      </Switch>
    </div>
  </div >);
}

export default App;
