import React, { useEffect, useState } from 'react';
import { Container,
        DialogActions,
        DialogContent,
        DialogContentText,
        Dialog } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import Loading from '../../../assets/Loading/Loading';
import Cart from '../../../assets/AddToCart/Cart';
import axios from 'axios';
import './SingleProduct.css'


export default function SingleProduct(props) {

    const [ product, setProduct ] = useState();
    const [open, setOpen] = useState(false);
    
    const User = JSON.parse(localStorage.getItem("User"));

    useEffect(() => {
        axios.get(`https://ecommerce0011.herokuapp.com/product/${props.match.params.productId}`, {
            headers: {
                "x-access-token": User.accessToken
            }}).then(response => {
                setProduct(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    const AddToCart = (e) => {
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
        <Container>  
            {!product ? 
            (
                <Loading />
            ) : (
                <main class="container">
                    <div class="left-column">
                        <img src={product.imageURL} alt="" />
                    </div>
                    <div class="right-column">
                        <div class="product-description">
                            <h1>{product.title}</h1>
                            <p>{product.description}</p>
                        </div>
                        <div class="product-price">
                            <spa><b>PKR {product.price} RS.</b></spa>
                            <br />
                            <br />
                            <Button variant="outline-primary" value={product._id} onClick={AddToCart}>Add to cart</Button>
                        </div>
                    </div>
                </main>
            )} 
            <br />
            <br />
            <br />
            <br />
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
        </Container>
    )
}
