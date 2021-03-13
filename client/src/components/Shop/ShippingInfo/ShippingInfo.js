import React, { useContext } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { ContextData } from '../../../Context';

export default function ShippingInfo() {

    const { shippingInfo, setShippingInfo } = useContext(ContextData);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5} md={4}>
                    <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined" 
                        fullWidth
                        type="email"
                        value={shippingInfo.customer_email} 
                        onChange={(e)=>setShippingInfo({...shippingInfo, 'customer_email': e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                    <TextField 
                        id="outlined-basic" 
                        label="Phone Number" 
                        variant="outlined" 
                        fullWidth
                        type="tel"
                        value={shippingInfo.phone_number} 
                        onChange={(e)=>setShippingInfo({...shippingInfo, 'phone_number': e.target.value})}
                    />
                </Grid>
                <Grid sm={2} md={4} />
                <Grid item xs={12} sm={4} md={3}>
                    <TextField 
                        id="outlined-basic" 
                        label="Province" 
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={shippingInfo.province} 
                        onChange={(e)=>setShippingInfo({...shippingInfo, 'province': e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <TextField 
                        id="outlined-basic" 
                        label="City" 
                        variant="outlined" 
                        fullWidth
                        text="text"
                        value={shippingInfo.city} 
                        onChange={(e)=>setShippingInfo({...shippingInfo, 'city': e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                    <TextField 
                        id="outlined-basic" 
                        label="Post Code" 
                        variant="outlined" 
                        fullWidt
                        value={shippingInfo.post_code} 
                        onChange={(e)=>setShippingInfo({...shippingInfo, 'post_code': e.target.value})}
                    />
                </Grid>
                <Grid sm={2} md={4}/>
                <Grid item xs={12} sm={10} md={8}>
                    <TextField 
                        id="outlined-basic" 
                        label="Shipping Address" 
                        variant="outlined" 
                        fullWidth
                        rows={4}
                        multiline
                        value={shippingInfo.shipping_address} 
                        onChange={(e)=>setShippingInfo({...shippingInfo, 'shipping_address': e.target.value})}
                    />
                </Grid>
            </Grid>
        </>
    )
}
