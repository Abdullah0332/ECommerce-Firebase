import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import { Nav, Navbar, Container, Button } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
  }));

const AdminNavbar = () => {
    const classes = useStyles();

    const Admin = JSON.parse(localStorage.getItem("Admin"));

    const LogOut = () => {
        localStorage.removeItem("Admin")
        window.location = "/admin"
    }

    return (
        <div className={classes.root}>
            <Navbar bg="dark" variant="dark" expand="sm" >
                <Container>
                    <Navbar.Brand href="/admin">E Buy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {Admin ? (
                            <>
                                <Nav className="mr-auto">
                                    <Nav.Link href="/admin/adminpanel">Dashboard</Nav.Link>
                                    <Nav.Link href="/admin/Products">Products</Nav.Link>  
                                    <Nav.Link href="/admin/Users">Users</Nav.Link>  
                                    <Nav.Link href="/admin/Orders">Orders</Nav.Link>  
                                </Nav>
                                    <Button variant="outline-primary" onClick={LogOut}>Sign Out</Button>
                            </>
                        ) : (
                            <>
                                <Nav className="mr-auto">
                                    <Nav.Link href="/admin"/>
                                </Nav>
                                <Button variant="outline-primary" href={"/admin/SignIn"} >Sign In</Button>
                                <Button variant="outline-primary" href={"/SignIn"} >Sign In as User</Button>
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

export default AdminNavbar