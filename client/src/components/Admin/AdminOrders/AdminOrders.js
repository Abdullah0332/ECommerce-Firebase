import React, { useEffect, useState } from 'react';
import { Container, 
        Grid,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow,
        Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../../../assets/Loading/Loading';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    table: {
        minWidth: 650,
    },
}));

export default function AdminOrders() {

    const classes = useStyles();

    const [ orders, setOrders ] = useState([]);

    const Admin = JSON.parse(localStorage.getItem("Admin"));

    useEffect(() => {
        axios.get("https://ecommerce0011.herokuapp.com/Admin/orders", {
            headers: {
                "x-access-token": Admin.accessToken
            }}).then(response => {
                setOrders(response.data) 
                console.log(response.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const handleInvoice = (orderId) => {
        axios.get(`https://ecommerce0011.herokuapp.com/invoice/${orderId}`, {
            responseType: 'blob',
            headers: {
                "x-access-token": Admin.accessToken
            }}).then(response => {
                const file = new Blob([response.data], {type: 'application/pdf'});

                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                window.open(fileURL);

            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <Container className={classes.root}>
            <h2><b>Total Orders</b></h2>
            <hr />
            <br />
            <Grid container spacing={4}>
            { orders.orderCount === 0 ? (
                <>
                    <h1>No Order</h1>
                </>
            )
            : ( 
                <>
                { !orders.length ? (
                    <Loading /> 
                ) : (
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                            <TableRow>
                                <TableCell><b>Customer Name</b></TableCell>
                                <TableCell align="left"><b>Phone Number</b></TableCell>
                                <TableCell align="left"><b>Payment Method</b></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {orders.map((order) => (
                                <TableRow>
                                    <TableCell>{order.shipping_information.firstName} {order.shipping_information.lastName}</TableCell>
                                    <TableCell align="left">{order.shipping_information.phone_number}</TableCell>
                                    <TableCell align="left">{order.shipping_information.payment_method}</TableCell>
                                    <TableCell align="left"><Button variant="primary" onClick={() => {handleInvoice(order._id)}}>Invoice</Button></TableCell>
                                    <TableCell align="left"><Button variant="primary" href={`/admin/Order/${order._id}`}>View Order</Button></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                </>
            )}
            </Grid>
        </Container>
    )
}
