import React, { useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import { ContextData } from './Context';
import jwt from 'jsonwebtoken';

function App() {

  const [ shippingInfo, setShippingInfo ] = useState({
    firstName: "",
    lastName: "",
    customer_email: "",
    phone_number: "",
    province: "",
    city: "",
    post_code: "",
    shipping_address: "",
    payment_method: "Cash On Delivery",
    Transaction_SS: ""
  });

  const User = JSON.parse(localStorage.getItem("User"));

  if (User){
    jwt.verify(User.accessToken, 'ecommerce-secret-key', function(err, decoded) {
      if (err) {
        localStorage.removeItem("User")
        window.location = "/SignIn"
        console.log(err)
      }
    });
  }

  return (
    <BrowserRouter>
      <ContextData.Provider value={{ shippingInfo, setShippingInfo }}>
        <Routes />
      </ContextData.Provider>
    </BrowserRouter>
  );
}

export default App;
