import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, Grid, Button, CardMedia } from '@material-ui/core';
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

export default function SingleOrder(props) {

    const classes = useStyles();
    const User = JSON.parse(localStorage.getItem("User"));
    const [ orderData, setOrderData ] = useState();
    var totalPrice = 0;

    useEffect(() => {
        axios.get(`https://ecommerce0011.herokuapp.com/order/${props.match.params.orderId}`, {
            headers: {
                "x-access-token": User.accessToken
            }}).then(response => {
                setOrderData(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, []);

    return (
        <Container maxWidth="md">
            {!orderData ? (
                <Loading />
            ) : (
                <>
                    <div style={{ display: "flex" }} >
                        <Button variant="contained" href={`/Orders/${User.userId}`}><ArrowBackOutlinedIcon /></Button>
                        <Typography variant="h6" style={{ paddingLeft: "10px", marginTop: "5px" }}><b>Order Number : {orderData._id}</b></Typography>
                    </div>
                    <br />
                    <br />
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Grid item xs={12}>
                                <Card className={classes.card}>
                                    <Typography variant="h6"><b>Products</b></Typography>
                                    <br />
                                    {orderData.products.map(product => {
                                        totalPrice += ((product.price)*(product.quantity))
                                        return (
                                            <div style={{ display: "flex", marginBottom: "5px"}}>
                                                <Typography variant="body2" className={classes.left}>{product.productTitle}</Typography>
                                                <span className={classes.right}>
                                                    <Typography variant="body2" className={classes.rightItem}>{product.price} x {product.quantity}</Typography>
                                                    <Typography variant="body2" className={classes.rightItem}>{(product.price)*(product.quantity)}</Typography>
                                                </span>
                                            </div>
                                        )
                                    })}
                                    <br />
                                    <div style={{ display: "flex", marginBottom: "5px"}}>
                                        <span>
                                            <Typography variant="body2" className={classes.left}><b>Total Price : </b></Typography>
                                            <Typography variant="body2" color="textSecondary">(Without Shipping & Discount)</Typography>
                                        </span>
                                        <span className={classes.right}>
                                            <Typography variant="body2" className={classes.rightItem} style={{ marginTop: "10px"}}><b>{totalPrice}</b></Typography>
                                        </span>
                                    </div>
                                    <hr />
                                    <div style={{ display: "flex", marginBottom: "5px"}}>
                                        <span>
                                            <Typography variant="body2" className={classes.left}><b>Total Price : </b></Typography>
                                            <Typography variant="body2" color="textSecondary">(With Shipping)</Typography>
                                        </span>
                                        <span className={classes.right}>
                                            <Typography variant="body2" className={classes.rightItem} style={{ marginTop: "10px"}}><b>{(totalPrice + 250)}</b></Typography>
                                        </span>
                                    </div>
                                </Card>
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <Card className={classes.card}>
                                    <Typography variant="h6"><b>Shippng Information</b></Typography>
                                    <br />
                                    <Typography variant="body2" className={classes.TextBottom}>First Name : {orderData.shipping_information.firstName}</Typography>
                                    <Typography variant="body2" className={classes.TextBottom}>Last Name : {orderData.shipping_information.lastName}</Typography>
                                    <Typography variant="body2" className={classes.TextBottom}>Phone Number : {orderData.shipping_information.phone_number}</Typography>
                                    <Typography variant="body2" className={classes.TextBottom}>Province : {orderData.shipping_information.province}</Typography>
                                    <Typography variant="body2" className={classes.TextBottom}>City : {orderData.shipping_information.city}</Typography>
                                    <Typography variant="body2" className={classes.TextBottom}>Post Code : {orderData.shipping_information.post_code}</Typography>
                                    <Typography variant="body2" className={classes.TextBottom}>Shipping Address : {orderData.shipping_information.shipping_address}</Typography>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item xs={12}>
                                <Card className={classes.card}>
                                    <Typography variant="h6"><b>User Information</b></Typography>
                                    <br />
                                    <Typography variant="body2" className={classes.TextBottom}>Last Name : {orderData.name}</Typography>
                                    <div className={classes.details}>
                                        <Typography variant="body2" color="textSecondary" style={{ marginBottom: "30px"}}>Email : {orderData.email}</Typography>
                                    </div>
                                </Card>
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <Card className={classes.card}>
                                    <Typography variant="h6"><b>Payment Method</b></Typography>
                                    <br />
                                    <Typography variant="body2" className={classes.TextBottom}>Type : {orderData.shipping_information.payment_method}</Typography>
                                    {orderData.shipping_information.Transaction_SS === "" ? (
                                        null
                                    ): (
                                        <>
                                            <CardMedia
                                                component="img"
                                                style={{width: '270px', height: "30vh" }}
                                                image={orderData.shipping_information.Transaction_SS}
                                            />
                                        </>
                                    )}
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    )
}
