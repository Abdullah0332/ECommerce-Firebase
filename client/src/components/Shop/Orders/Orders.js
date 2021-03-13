import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableRow,
        Paper } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import Loading from '../../../assets/Loading/Loading';
import NoOrder from '../../../assets/NoOrder/NoOrder';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export default function Orders(props) {

    const classes = useStyles();

    const User = JSON.parse(localStorage.getItem("User"));
    const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        axios.get(`https://ecommerce0011.herokuapp.com/getorder/${props.match.params.userId}`, {
            headers: {
                "x-access-token": User.accessToken
            }}).then(response => {
                setOrders(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    const handleInvoice = (orderId) => {
        axios.get(`https://ecommerce0011.herokuapp.com/invoice/${orderId}`, {
            responseType: 'blob',
            headers: {
                "x-access-token": User.accessToken
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
        <Container maxWidth="md">
            <h2><b>ORDERS</b></h2>
            <Button variant="outline-primary" href="/">Buy Products</Button>
            <hr />

            {orders.orderCount === 0 ? (
                <NoOrder />
            ) : (
                <>
                {!orders.length ? (
                    <>
                      <Loading />  
                    </>
                ) : (
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableBody>
                            {orders.map((order, index) => (
                                <TableRow>
                                    <TableCell><b>{index+1}</b></TableCell>
                                    <TableCell><b>{order.shipping_information.firstName} {order.shipping_information.lastName}</b></TableCell>
                                    <TableCell align="left"><b>{order.shipping_information.phone_number}</b></TableCell>
                                    <TableCell align="left"><b>{order.shipping_information.payment_method}</b></TableCell>
                                    <TableCell align="left"><Button variant="outline-primary" onClick={() => {handleInvoice(order._id)}}>Invoice</Button></TableCell>
                                    <TableCell align="left"><Button variant="outline-primary" href={`/Order/${order._id}`}>View Order</Button></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                </>
            )}
        </Container>
    )
}
