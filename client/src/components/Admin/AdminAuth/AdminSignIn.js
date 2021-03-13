import React, { useState } from 'react';
import { Container,
        TextField,
        Grid,
        Hidden }  from '@material-ui/core';
import axios from 'axios';
import AdminLogin from '../../../assets/AdminLogin/AdminLogin';
import { Button } from 'react-bootstrap';

export default function AdminSignIn() {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("https://ecommerce0011.herokuapp.com/Admin", data,{
                headers: {
                "Content-Type": "application/json",
                },
            }
        ).then(res => {
            localStorage.setItem("Admin", JSON.stringify(res.data));
            window.location = ('/admin/adminpanel')
        })
    };

    return (
        <Grid container spacing={0} style={{ height: "91.2vh", marginTop: "-48px" }}>
            <Hidden xsDown>
                <Grid item sm={6} md={6} lg={6} style={{ backgroundColor: "black"}}>
                    <AdminLogin />
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={6} md={6} lg={6} >
                <Container maxWidth="sm">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h2><b>Admin Login</b></h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            fullWidth
                            name="email"
                            variant="outlined" 
                            value={data.email}
                            onChange={(e) => setData({ ...data, "email": e.target.value })}
                        />
                        <br />
                        <br />
                        <TextField 
                            type="password"
                            label="Password"
                            fullWidth
                            name="password"
                            variant="outlined" 
                            value={data.password}
                            onChange={(e) => setData({ ...data, "password": e.target.value })}
                        />
                        <br />
                        <br />
                        <Button variant="primary" type="submit" block>
                            Log In
                        </Button>
                    </form>
                </Container>
            </Grid>
        </Grid>
    )
}
