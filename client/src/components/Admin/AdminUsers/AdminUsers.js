import React, { useEffect, useState } from 'react';
import { Container, 
        Grid } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../../../assets/Loading/Loading';
import axios from 'axios';
import './AdminUsers.css'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 340
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

export default function AdminUsers() {

    const classes = useStyles();

    const [ users, setUsers ] = useState([]);

    const Admin = JSON.parse(localStorage.getItem("Admin"));

    useEffect(() => {
        axios.get("https://ecommerce0011.herokuapp.com/Admin/users", {
            headers: {
                "x-access-token": Admin.accessToken
            }}).then(response => {
                console.log(response)
                setUsers(response.data) 
                
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Container>
            <h2><b>Total User</b></h2>
            <hr />
            <br />
            <Grid container spacing={4}>
            { users.userCount === 0 ? (
                <>
                    <h1>No User</h1>
                </>
            )
            : ( 
                <>
                { !users.length ? (
                    <Loading /> 
                ) : (
                    users.map(user => {
                        return ( 
                            <Grid item  key={user._id}  >

                                    <div className="wrapper1" className={classes.root}>
                                        <div className="user-image">
                                            <img src={user.imageURL} height="200px" width="300px" />
                                        </div>
                                        <Button className="profile__button" id="follow" href={`/admin/user/${user._id}`}><span class="but-text">View Profile</span></Button>
                                        
                                        <div className="user-text">
                                        <h1 className="user-name">{user.name}</h1>
                                        <p className="user-info">{user.email}</p>
                                        </div>
                                    </div>

                            </Grid> 
                        )
                    })
                )}
                </>
            )}
            </Grid>
        </Container>
    )
}
