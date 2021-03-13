import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, Grid, Table, TableContainer, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../../../assets/Loading/Loading';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: "5px 0px"
    },
    card:{
        padding: "10px"
    },
    left: {
        fontSize: "17px",
        padding: "0px 5px",
    },
    right: {
        display: "flex",
        marginLeft: "auto",
    },
    rightItem: {
        fontSize: "17px",
        padding: "0px 40px",
    },
    TextBottom: {
        marginBottom: "5px"
    }
}));

export default function AdminSingleUser(props) {

    const classes = useStyles();
    const Admin = JSON.parse(localStorage.getItem("Admin"));
    const [ userData, setUserData ] = useState();
    const [ orderData, setOrderData ] = useState();

    useEffect(() => {
        axios.get(`https://ecommerce0011.herokuapp.com/Admin/user/${props.match.params.userId}`, {
            headers: {
                "x-access-token": Admin.accessToken
            }}).then(response => {
                setUserData(response.data.user)
                setOrderData(response.data.order)
            }).catch(error => {
                console.log(error)
            })
            

    }, []);

    return (
        <Container maxWidth="md">
            {!userData ? (
                <Loading />
            ) : (
                <>
                    <div style={{ display: "flex" }} >
                        <Button variant="contained" href={`/admin/Users`}><ArrowBackOutlinedIcon /></Button>
                        <Typography variant="h6" style={{ paddingLeft: "10px", marginTop: "5px" }}><b>User Number : {userData._id}</b></Typography>
                    </div>
                    <br />
                    <br />
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Grid item xs={12}>
                                <Card className={classes.card}>
                                    <Typography variant="h6"><b>{userData.name}</b></Typography>
                                    <br />
                                    <div className={classes.details}>
                                        <Typography variant="body2" color="textSecondary" style={{ marginBottom: "30px"}}>Email : {userData.email}</Typography>
                                    </div>
                                    {orderData ? (
                                        <>
                                            <Typography variant="h6"><b>Total Orders : {orderData.length}</b></Typography>
                                            <Typography variant="h6"><b>Products in Cart : {userData.cart.items.length}</b></Typography>
                                        </>
                                    ) : (
                                        null
                                    )}
                                    
                                </Card>
                            </Grid>
                            <br />
                        </Grid>
                        <Grid item xs={8}>
                            <Grid item xs={12}>
                                <Card className={classes.card}>
                                    <Typography variant="h6"><b>Cart Information</b></Typography>
                                    <br />
                                    <div className="shopping-cart">
                                        {userData.cart.items.map((item) => (
                                            <>
                                                <div className="cart-column-labels">
                                                    <label className="cart-product-image">Image</label>
                                                    <label className="cart-product-details">Product</label>
                                                    <label className="cart-product-price">Price</label>
                                                    <label className="cart-product-quantity">Quantity</label>
                                                    <label className="cart-product-line-price">Total</label>
                                                </div>
                                                <div className="cart-product">
                                                    <div className="cart-product-image">
                                                        <img src={item.imageURL} />
                                                    </div>
                                                    <div className="cart-product-details">
                                                        <div className="cart-product-title"><b>{item.productTitle}</b></div>
                                                        <p className="cart-product-description">{item.description}</p>
                                                    </div>
                                                    <div className="cart-product-price">{item.price}</div>
                                                    <div className="cart-product-quantity">{item.quantity}</div>
                                                    <div className="cart-product-removal">
                                                    </div>
                                                    <div className="cart-product-line-price">{(item.quantity)*(item.price)}</div>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </Card>
                            </Grid>
                            <br />
                            <br />
                            <Grid item xs={12}>
                            {!orderData? (
                                <>
                                    <h2><b>No Order</b></h2>
                                </>
                            ) : (
                                <Card>
                                    <TableContainer >
                                        <Table className={classes.table} size="small" aria-label="a dense table">
                                            <h2><b>Order</b></h2>
                                            <TableBody>
                                            {orderData.map((order, index) => (
                                                <TableRow>
                                                    <TableCell><b>{index+1}</b></TableCell>
                                                    <TableCell><b>{order.shipping_information.firstName} {order.shipping_information.lastName}</b></TableCell>
                                                    <TableCell align="left"><b>{order.shipping_information.phone_number}</b></TableCell>
                                                    <TableCell align="left"><b>{order.shipping_information.payment_method}</b></TableCell>
                                                    <TableCell align="left"><Button variant="outline-primary" href={`/Order/${order._id}`}>View Order</Button></TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Card>
                            )}
                            </Grid>
                            <br />
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    )
}
