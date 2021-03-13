import React, { useState } from 'react';
import { Container, TextField, InputAdornment} from '@material-ui/core';
import { Button } from 'react-bootstrap';
import firebase from '../../firebase';
import { AccountCircle } from '@material-ui/icons';


export default function ForgetPassword() {

    const [email, setEmail] = useState("");

    const ResetPassword = (e) => {

        firebase.auth().sendPasswordResetEmail(email).then(function() {
          alert("Check your mail")
          window.location = ("/SignIn")
        }).catch(error => {
          console.log(error)
        });
      }

    return (
        <Container maxWidth="sm">
            <h2><b>Forget Password</b></h2>
            <TextField
                label="Email"
                name="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                    ),
                }}
            />
            <br />
            <br />
            <Button style={{ float: "right" }} onClick={ResetPassword} variant="outline-primary">Send Mail</Button>
        </Container>
    )
}
