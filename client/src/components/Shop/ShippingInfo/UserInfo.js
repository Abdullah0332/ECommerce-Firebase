import React, { useContext } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { ContextData } from '../../../Context';

export default function UserInfo() {

    const { shippingInfo, setShippingInfo } = useContext(ContextData);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                        id="outlined-basic" 
                        label="First Name" 
                        variant="outlined"
                        value={shippingInfo.firstName} 
                        onChange={(e)=>setShippingInfo({...shippingInfo, 'firstName': e.target.value})}
                    />
                </Grid>
                <br />
                <Grid item xs={12}>
                    <TextField 
                        id="outlined-basic" 
                        label="Last Name" 
                        variant="outlined" 
                        value={shippingInfo.lastName} 
                        onChange={(e)=>setShippingInfo({...shippingInfo, 'lastName': e.target.value})}
                    />
                </Grid>
            </Grid>
        </>
    )
}
