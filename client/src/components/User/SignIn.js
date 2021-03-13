import React, { useState } from 'react';
import { Container,
        TextField,
        Grid,
        Hidden } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import firebase from '../../firebase';
import axios from 'axios';
import UserLogin from '../../assets/UserLogin/UserLogin';

export default function SignIn() {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(data.email,data.password)
            .then((user) => {

                if(!user.user.emailVerified){
                    alert("Kindly Verify your Email")
                }

                if(user.user.emailVerified) {
            
                    axios.post("https://ecommerce0011.herokuapp.com/SignIn", data,{
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    ).then(res => {
                        // console.log(res)
                        localStorage.setItem("User", JSON.stringify(res.data));
                        window.location = ('/')
                    })
                }
            }).catch(error => {
                alert(error.code.split('/')[1])
            })
    };

    return (
        <Grid container spacing={0} style={{ height: "79vh"}}>
            <Hidden xsDown>
                <Grid item sm={5} md={6} lg={6} >
                    <UserLogin />
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={7} md={6} lg={6} >
                <Container maxWidth="sm">
                    <br />
                    <br />
                    <br />
                    <h2><b>Login</b></h2>
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
                    <br />
                    <a href="/ForgetPassword">Forget Password?</a>
                    <a href="/SignUp" style={{ float: 'right' }}>Don't have an account? Sign Up</a>
                </Container>
            </Grid>
        </Grid>
    )
}
