import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const LandingPage = () => {
  return (
    <div>
      <h3>Welcome to CoffeeNote!</h3>
      <div>
        <h5>Already have a profile? </h5>
        <Link to="/login"><Button>Log in</Button></Link>
      </div>
      <br />

      <div>
        <h5>Need a new profile?</h5>
        <Link to="/create"><Button>Create a new profile</Button></Link>
      </div>
    </div>
  )
}

export default LandingPage