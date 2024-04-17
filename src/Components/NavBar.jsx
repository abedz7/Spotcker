import React from 'react'
import { Container, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function NavBar() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">SPOTCKER</Navbar.Brand>
                    <div className="ml-auto"> 
                    <Link to={`/SignIn/`}>
                    <Button variant="primary" className="me-2">Sign In</Button>
                    </Link>
                      <Link to={`/SignUp/`}>
                      <Button variant="primary">Sign Up For Free</Button>
                      </Link>                        
                    </div>
                </Container>
            </Navbar>
        </div>
    )
}
