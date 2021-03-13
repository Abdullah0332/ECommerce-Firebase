import React, { useEffect, useState } from 'react';
import {Dialog,
        DialogActions,
        DialogTitle} from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { grey } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Loading from '../../../assets/Loading/Loading';
import axios from 'axios';
import './SingleAdminProduct.css';

const useStyles = makeStyles((theme) => ({
    dialog: {
        color: "#ffffff", 
        backgroundColor: "#363636",
        padding: "20px"
    },
}));

export default function SingleAdminProduct(props) {

    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);
    const [ product, setProduct ] = useState();

    
    const Admin = JSON.parse(localStorage.getItem("Admin"));

    useEffect(() => {
        axios.get(`https://ecommerce0011.herokuapp.com/product/${props.match.params.productId}`, {
            headers: {
                "x-access-token": Admin.accessToken
            }}).then(response => {
                setProduct(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    const DeleteProduct = () => {

        axios.delete(`https://ecommerce0011.herokuapp.com/delete/${props.match.params.productId}`, {
            headers: {
                "x-access-token": Admin.accessToken
            }}).then(response => {
                window.location = '/admin/Products'
            }).catch(error => {
                console.log(error)
            })
    }

    const ColorButton = withStyles(() => ({
        root: {
          color: grey[800],
          backgroundColor: grey[50],
          '&:hover': {
            backgroundColor: grey[50],
          },
         
        },
    }))(Button);

    const handleOpen = () => {
        setOpen(true);
      };
    
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
                        <img src={product.imageURL} />
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
                            <div>
                            <Button 
                                variant="danger" 
                                onClick={handleOpen}
                                >
                                    Delete Product <DeleteIcon />
                            </Button>
                        </div>
                        <br />
                        <Button 
                            variant="info" 
                            href={`/admin/updateProduct/${product._id}`}
                            >
                                Update Product
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <div className={classes.dialog}>
                                <DialogTitle >Are you sure to Delete</DialogTitle>
                                <DialogActions>
                                    <ColorButton onClick={handleClose} color="primary">
                                        No
                                    </ColorButton>
                                    <ColorButton onClick={DeleteProduct} color="primary" autoFocus>
                                        Yes
                                    </ColorButton>
                                </DialogActions>
                            </div>
                        </Dialog>
                        </div>
                    </div>
                </main>
            )} 
            <br />
            <br />
            <br />
            <br />
        </Container>
    )
}
