import React, { useState } from 'react';
import { Container, TextField } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import FileBase from 'react-file-base64';
import axios from 'axios';

export default function CreateProduct() {

    const [ addProduct, setAddProduct ] = useState({
        title: "",
        price: 0,
        description: "",
        imageURL: "",
    })

    const Admin = JSON.parse(localStorage.getItem("Admin"));
    
    const handleSubmit = (e) => {

        e.preventDefault();

        axios.post("https://ecommerce0011.herokuapp.com/createProduct", addProduct, {
            headers: {
                "x-access-token": Admin.accessToken
            }}).then((res) => {
                window.location = '/admin/Products'
            }).catch(err => {
                console.log(err)
            })
    }

    const clear = () => {
        setAddProduct({ 
            title: "",
            price: 0,
            description: "",
            imageURL: ""
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Container maxWidth="sm">
                    <h2><b>Add Products</b></h2>
                    <TextField 
                        label="Title"
                        fullWidth
                        variant="outlined" 
                        name="title"
                        type="text"
                        required
                        value={addProduct.title}
                        onChange={e => setAddProduct({ ...addProduct, "title": e.target.value})}
                    /> 
                    <br />
                    <br /> 
                    <TextField 
                        label="Price"
                        fullWidth
                        variant="outlined" 
                        required
                        name="price"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={addProduct.price}
                        onChange={e => setAddProduct({ ...addProduct, "price": parseInt(e.target.value)})}
                    /> 
                    <br />
                    <br />
                    <TextField 
                        label="Description"
                        fullWidth
                        required
                        variant="outlined" 
                        name="description"
                        type="text"
                        value={addProduct.description}
                        onChange={e => setAddProduct({ ...addProduct, "description": e.target.value})}
                    />
                    <br />
                    <br />
                        <FileBase 
                            type="file" 
                            multiple={false} 
                            required
                            onDone={({ base64 }) => setAddProduct({ ...addProduct, imageURL: base64 })} 
                        />
                    <br />
                    <br />
                    <Button variant="outline-primary" type="submit" > 
                        Create Product
                    </Button>
                    <br />
                    <br />
                    <Button variant="outline-primary" onClick={clear} > 
                        Clear Product
                    </Button>
                </Container>
            </form>
        </div>
    )
}
