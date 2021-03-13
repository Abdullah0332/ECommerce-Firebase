import React, { useEffect, useState } from 'react';
import { Container, 
        Grid } from '@material-ui/core';
import { Card, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../../../assets/Loading/Loading';
import Empty from '../../../assets/Empty/Empty';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 340
    },
}));

export default function Products() {

    const classes = useStyles();

    const [ products, setProducts ] = useState([]);

    const Admin = JSON.parse(localStorage.getItem("Admin"));

    useEffect(() => {
        axios.get("https://ecommerce0011.herokuapp.com/products", {
            headers: {
                "x-access-token": Admin.accessToken
            }}).then(response => {
                setProducts(response.data) 
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Container >
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <h2><b>Products</b></h2>
                    <Button 
                        variant="primary"
                        href="/admin/createProduct"
                    >
                        Add Product
                    </Button>
                </Grid>
                <Grid item xs={4} />
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
                            <Grid item xs={12} sm={6} md={4}  key={product._id}  >
                                
                                <Card style={{ width: '18rem'}} className={classes.root} >
                                    <div style={{ width: '50%', marginTop: '10px', marginLeft: "auto", marginRight: "auto", display: "block"}}>
                                        <Card.Img variant="top" height="200px" src={product.imageURL} />
                                    </div>
                                    <Card.Body>
                                        <Card.Title><b>Title : {product.title}</b></Card.Title>
                                        <Card.Text>
                                            <b>Price : {product.price} RS.</b>
                                        </Card.Text>
                                        <Button variant="outline-primary" href={`/admin/product/${product._id}`}>View Detail</Button>
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
