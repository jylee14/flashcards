import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface BannerProps {
  username: string | null;
}

const GreetingBanner: React.FC<BannerProps> = ({ username }) => {
  const padding: React.CSSProperties = {
    paddingLeft: '1em',
    float: 'right'
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" sticky="top">
      <Navbar.Brand href="/">FlashCards</Navbar.Brand>
      {
        username ?
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span"><Link to="/coffee">Coffee</Link></Nav.Link>
                <Nav.Link href="#" as="span"><Link to="/bean">Beans</Link></Nav.Link>
              </Nav>
              <Navbar.Text className="justify-content-end">
                {username}&apos;s profile
              </Navbar.Text>
              <span style={padding}>
                <Button size="sm" variant="secondary">Logout</Button>
              </span>
            </Navbar.Collapse>
          </>
          : null
      }
    </Navbar>
  )
}

export default GreetingBanner