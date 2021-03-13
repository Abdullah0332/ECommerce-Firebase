import React, { useEffect, useState } from 'react';
import {  Grid, Container } from '@material-ui/core';
import { Card, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../../assets/Loading/Loading';
import Empty from '../../assets/Empty/Empty';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));
export default function ShowProducts() {

    const classes = useStyles();

    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        axios.get("https://ecommerce0011.herokuapp.com/showProducts")
            .then(response => {
                setProducts(response.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Container className={classes.root}>
            <h2><b>Products</b></h2>
            <hr />
            <br />
            <Grid container spacing={2}>
            { products.productCount === 0 ? (
                <>
                    <Empty />
                </>
            )
            : ( 
                <>
                { !products.length ? (
                    <Loading /> 
                ) : (
                    products.map(product => {
                        return ( 
                            <Grid item xs={12} sm={6} md={4} key={product._id}  >

                                <Card style={{ width: '18rem' }} key={product._id}>
                                    <div style={{ width: '50%', marginTop: '10px', marginLeft: "auto", marginRight: "auto", display: "block"}}>
                                        <Card.Img variant="top" height="200px" src={product.imageURL} rounded />
                                    </div>
                                    <Card.Body>
                                        <Card.Title><b>Title : {product.title}</b></Card.Title>
                                        <Card.Text>
                                            <b>Price : {product.price} RS.</b>
                                        </Card.Text>
                                        <Button variant="outline-primary" href={`/SignIn`}>View Detail</Button>
                                    </Card.Body>
                                </Card>

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
