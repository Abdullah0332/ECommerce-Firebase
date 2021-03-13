import React, { useState } from 'react';
import { Container,
        TextField,
        Grid,
        Hidden } from '@material-ui/core';  
import firebase from '../../firebase';
import axios from 'axios';
import FileBase from 'react-file-base64';
import { Button } from 'react-bootstrap';
import AdminLogin from '../../assets/AdminLogin/AdminLogin';

export default function SignUp(props) {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        imageURL: ""
    });

    const handleSubmit = (e) => {

        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((firebaseData) => {
                firebase.auth().currentUser.sendEmailVerification()
                    .then(() => {
                        alert("Email has been sent to provided email. Please verify before signing in");
                        axios.post("https://ecommerce0011.herokuapp.com/SignUp",data,{
                            headers: {
                            "Content-Type": "application/json",
                            },
                        }).then(response => {
                            window.location = "/SignIn"
                        }).catch(error => {
                            console.log(error)
                        })
                    })
            }).catch(error => {
                alert(error.message)
            })
    };

  return (
    <Grid container spacing={0} style={{ height: "91.1vh", marginTop: "-48px" }}>
        <Hidden xsDown>
            <Grid item md={6} lg={6} style={{ backgroundColor: "black"}}>
                <AdminLogin />
            </Grid>
        </Hidden>
        <Grid item xs={12} sm={12} md={6} lg={6} >
            <Container maxWidth="sm">
                <br />
                <br />
                <h2><b>Sign Up</b></h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <TextField 
                        label="Name"
                        fullWidth
                        type="name"
                        name="name"
                        variant="outlined" 
                        value={data.name}
                        required
                        onChange={(e) => setData({ ...data, "name": e.target.value })}
                    />
                    <br />
                    <br />
                    <TextField 
                        label="Email"
                        fullWidth
                        type="email"
                        name="email"
                        variant="outlined"
                        required 
                        value={data.email}
                        onChange={(e) => setData({ ...data, "email": e.target.value.toLowerCase() })}
                    />
                    <br />
                    <br />
                    <TextField 
                        label="Password"
                        fullWidth
                        type="password"
                        variant="outlined" 
                        name="password"
                        required
                        value={data.password}
                        onChange={(e) => setData({ ...data, "password": e.target.value })}
                    />
                    <br />
                    <br />
                    <div required >
                        <FileBase 
                            type="file" 
                            multiple={false} 
                            required
                            onDone={({ base64 }) => setData({ ...data, imageURL: base64 })} 
                        />
                    </div>
                    <br />
                    <br />
                    <Button variant="primary" type="submit" block>
                        Sign Up
                    </Button>
                </form>
                <br />
                <a href="/SignIn" style={{ float: 'right' }}>Already have an account? Log In</a>
            </Container>
        </Grid>
    </Grid>
  )
}
