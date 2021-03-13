import React, { useEffect, useState } from 'react';
import {  Grid,
        Container,
        DialogActions,
        DialogContent,
        DialogContentText,
        Dialog } from '@material-ui/core';
import { Card, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../../assets/Loading/Loading';
import Empty from '../../assets/Empty/Empty';
import Cart from '../../assets/AddToCart/Cart';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardroot: {
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

export default function Home() {

    const classes = useStyles();

    const [ products, setProducts ] = useState([]);
    const [open, setOpen] = useState(false);

    const User = JSON.parse(localStorage.getItem("User"));

    useEffect(() => {
        axios.get("https://ecommerce0011.herokuapp.com/products", {
            headers: {
                "x-access-token": User.accessToken
            }}).then(response => {
                setProducts(response.data) 
            }).catch(err => {
                console.log(err)
            })
    }, [])
    
    const AddToCart = (product) => {
        setOpen(true);
        axios.post(`https://ecommerce0011.herokuapp.com/addToCart`, { userId: User.userId, product}, {
            headers: {
                "x-access-token": User.accessToken
            }}).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
    }
    
    const handleClose = () => {
        setOpen(false);
    };

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
    
                                <Card style={{ width: '18rem' }} className={classes.cardroot}>
                                    <div style={{ width: '50%', marginTop: '10px', marginLeft: "auto", marginRight: "auto", display: "block"}}>
                                        <Card.Img variant="top" height="200px" src={product.imageURL} />
                                    </div>
                                    <Card.Body>
                                            <Card.Title><b>Title : {product.title}</b></Card.Title>
                                        <Card.Text>
                                            <b>Price : {product.price} RS.</b>
                                        </Card.Text>
                                        <span style={{ display: 'flex'}}>
                                            <Button variant="outline-primary" href={`/product/${product._id}`}>View Product</Button>
                                            <Button variant="outline-primary" style={{ marginLeft: "10px" }} onClick={() => {AddToCart(product)}}>Add to Cart</Button>
                                        </span>
                                    </Card.Body>
                                </Card>

                            </Grid> 
                        )
                    })
                )}
                </>
            )}

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent style={{ padding: '50px 100px' }}>
                        <Cart />
                        <DialogContentText id="alert-dialog-description">
                            Product Add To Cart
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Container>
    )
}
