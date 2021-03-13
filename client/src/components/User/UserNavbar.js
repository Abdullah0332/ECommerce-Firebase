import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Nav, Navbar, Container, Button } from 'react-bootstrap'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
  }));

const UserNavbar = () => {
    const classes = useStyles();

    const User = JSON.parse(localStorage.getItem("User"));

    const LogOut = () => {
        localStorage.removeItem("User")
        window.location = "/SignIn"
    }

    return (
        <div className={classes.root}>
            <Navbar bg="dark" variant="dark" expand="sm" sticky="bottom">
                <Container>
                    <Navbar.Brand href="#home">E Buy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {User ? (
                            <>
                                <Nav className="mr-auto">
                                    <Nav.Link href="/">Products</Nav.Link>
                                    <Nav.Link href="/Cart">Cart</Nav.Link>  
                                    <Nav.Link href={`/Orders/${User.userId}`}>Orders</Nav.Link>  
                                </Nav>
                                    <Button variant="outline-primary" onClick={LogOut}>Sign Out</Button>
                            </>
                        ) : (
                            <>
                                <Nav className="mr-auto">
                                    <Nav.Link href="/">Products</Nav.Link>
                                </Nav>
                                    <Button variant="outline-primary" href={"/SignIn"} style={{ marginRight: "10px"}}>Log In</Button>
                                    <Button variant="outline-primary" href={"/SignUp"} style={{ marginRight: "10px"}}>Sign Up</Button>
                                    <Button variant="outline-primary" href={"/admin/SignIn"}>Admin Login</Button>
                            </>
                        )}
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </div>
    )
}

export default UserNavbar