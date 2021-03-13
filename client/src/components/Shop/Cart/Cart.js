import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import Loading from '../../../assets/Loading/Loading';
import EmptyCart from '../../../assets/EmptyCart/EmptyCart';
import './Cart.css';

export default function Cart() {

    const User = JSON.parse(localStorage.getItem("User"));
    const [ cart, setCart ] = useState();

    useEffect(() => {
        axios.get("https://ecommerce0011.herokuapp.com/cart", {
            headers: {
                "x-access-token": User.accessToken,
                "userId": User.userId
            }}).then(response => {
                setCart(response.data.cart)
            }).catch(error => {
                console.log(error)
            })
    }, [cart])


    const DeleteItemFromCart = (item) => {
        axios.post("https://ecommerce0011.herokuapp.com/deleteItemFromCart", {userId: User.userId, productId: item.productId}, {
            headers: {
                "x-access-token": User.accessToken
            }}).then(response => {
                window.location = '/Cart'
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <Container maxWidth="md">
            <h2><b>SHOPPING CART</b></h2>
            <hr />
            {!cart ? (
                <Loading />
            ) : (
                <>
                    { cart.items.length === 0 ? (
                        <>
                            <Button variant="outline-primary" href="/" style={{ float: "right"}}>Buy Products</Button>
                            <EmptyCart />
                        </>
                    ) : (
                        <>
                            <br />
                            <br />
                            <div className="shopping-cart">
                                {cart.items.map((item) => (
                                    <>
                                        <div className="cart-column-labels">
                                            <label className="cart-product-image">Image</label>
                                            <label className="cart-product-details">Product</label>
                                            <label className="cart-product-price">Price</label>
                                            <label className="cart-product-quantity">Quantity</label>
                                            <label className="cart-product-removal">Remove</label>
                                            <label className="cart-product-line-price">Total</label>
                                        </div>
                                        <div className="cart-product">
                                            <div className="cart-product-image">
                                                <img src={item.imageURL} alt={item.productTitle} />
                                            </div>
                                            <div className="cart-product-details">
                                                <div className="cart-product-title"><b>{item.productTitle}</b></div>
                                                <p className="cart-product-description">{item.description}</p>
                                            </div>
                                            <div className="cart-product-price">{item.price}</div>
                                            <div className="cart-product-quantity">{item.quantity}</div>
                                            <div className="cart-product-removal">
                                                <Button className="cart-remove-product" onClick={() => {DeleteItemFromCart(item)}}>
                                                    Remove
                                                </Button>
                                            </div>
                                            <div className="cart-product-line-price">{(item.quantity)*(item.price)}</div>
                                        </div>
                                    </>
                                ))}
                            </div>
                            <br />
                            <Button variant="outline-primary" href="/ShippingInfo" style={{ float: "right"}}>Check Out</Button>
                            <br />
                            <br />
                        </>
                    )}
                </>
            )}
            <br />
            <br />
            <br />
        </Container>
    )
}
