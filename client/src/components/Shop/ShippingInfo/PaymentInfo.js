import React, { useContext, useState } from 'react';
import { ContextData } from '../../../Context';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FileBase from 'react-file-base64';

export default function PaymentInfo() {

    const { shippingInfo, setShippingInfo } = useContext(ContextData);
    const [value, setValue] = useState('Cash On Delivery');

    const handleChange = (event) => {
        setValue(event.target.value);
        setShippingInfo({...shippingInfo, 'payment_method': event.target.value})
    };

    return (
        <div>
            <FormControl component="fieldset">
                <RadioGroup aria-label="transaction_type" name="transaction_type" value={value} onChange={handleChange}>
                    <FormControlLabel value="Cash On Delivery" control={<Radio color="primary"/>} label="Cash On Delivery" />
                    <FormControlLabel value="Online Transaction" control={<Radio color="primary" />} label="Transaction via EasyPaisa or JazzCash" />
                    {value === "Online Transaction" ? (
                        <>
                            <br />
                            <span>Easy Paisa or Jazz Cash Account Number : <b>03327198866</b></span>
                            <br />
                            <span>
                                <b>Transaction ScreenShot : </b> 
                                <FileBase 
                                    type="file" 
                                    multiple={false} 
                                    onDone={({ base64 }) => setShippingInfo({ ...shippingInfo, Transaction_SS: base64 })} 
                                />
                            </span>
                            <br />
                        </>
                    ) : (
                        null
                    )}
                </RadioGroup>
            </FormControl>
        </div>
    )
}
