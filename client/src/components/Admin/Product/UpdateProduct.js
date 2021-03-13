import React, { useState, useEffect } from 'react';
import { Container, TextField } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import FileBase from 'react-file-base64';
import Loading from '../../../assets/Loading/Loading';
import axios from 'axios';

export default function UpdateProduct(props) {

    const [ product, setProduct ] = useState({})

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

    const handleSubmit = (e) => {

        e.preventDefault();

        axios.patch(`https://ecommerce0011.herokuapp.com/updateProduct/${props.match.params.productId}`, product, {
            headers: {
                "x-access-token": Admin.accessToken
            }}).then((res) => {
                window.location = '/admin/Products'
            }).catch(err => {
                console.log(err)
            })
    }

    const clear = () => {
        setProduct({ 
            title: "",
            price: 0,
            description: "",
            imageUrl: "",
        })
    }

    return (
        <div>
            {!product ? (
                <Loading />
            ) : (
                <form onSubmit={handleSubmit}>
                    <Container maxWidth="sm">
                        <h2><b>Update Products</b></h2>
                        <TextField 
                            label="Title"
                            variant="outlined" 
                            fullWidth
                            name="title"
                            type="text"
                            value={product.title}
                            onChange={e => setProduct({ ...product, "title": e.target.value})}
                        /> 
                        <br /> 
                        <br /> 
                        <TextField 
                            label="Price"
                            fullWidth
                            variant="outlined" 
                            value={product.price}
                            name="price"
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            onChange={e => setProduct({ ...product, "price": parseInt(e.target.value)})}
                        />  
                        <br /> 
                        <br /> 
                        <TextField 
                            label="Description"
                            fullWidth
                            variant="outlined" 
                            name="description"
                            type="text"
                            value={product.description}
                            onChange={e => setProduct   ({ ...product, "description": e.target.value})}
                        />
                        <br />
                        <br />
                            <FileBase 
                                type="file" 
                                multiple={false} 
                                onDone={({ base64 }) => setProduct({ ...product, imageURL: base64 })} 
                            />
                        <br />
                        <br />
                        <Button variant="outline-primary" type="submit" > 
                            Update Product
                        </Button>
                        <br />
                        <br />
                        <Button variant="outline-primary" onClick={clear} > 
                            Clear Product
                        </Button>
                    </Container>
                </form>
            )}
        </div>
    )
}
