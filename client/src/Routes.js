import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";

//Admin

import AdminNavbar from './components/Admin/AdminNavbar';
import AdminSignIn from './components/Admin/AdminAuth/AdminSignIn';
import AdminPanel from './components/Admin/AdminPanel';

import Products from './components/Admin/Product/Products.js';
import CreateProduct from './components/Admin/Product/CreateProduct';
import SingleAdminProduct from './components/Admin/Product/SingleAdminProduct';
import UpdateProduct from './components/Admin/Product/UpdateProduct';

import AdminUsers from './components/Admin/AdminUsers/AdminUsers';
import AdminSingleUser from './components/Admin/AdminUsers/SingleAdminUser';

import AdminOrders from './components/Admin/AdminOrders/AdminOrders';
import AdminSingleOrder from './components/Admin/AdminOrders/AdminSingleOrder';

// User Auth

import UserNavbar from './components/User/UserNavbar';
import SignUp from './components/User/SignUp';
import SignIn from './components/User/SignIn';
import ForgetPassword from './components/User/ForgetPassword';

// Shop

import Home from './components/Shop/Home';
import ShowProducts from './components/Shop/ShowProducts';
import Cart from './components/Shop/Cart/Cart';
import SingleProduct from './components/Shop/SingleProduct/SingleProduct';
import ShippingInfo from './components/Shop/ShippingInfo/ShippingStepper';
import Orders from './components/Shop/Orders/Orders';
import SingleOrder from './components/Shop/Orders/SingleOrder';

export default function Routes() {

    const User = JSON.parse(localStorage.getItem("User"));
    const Admin = JSON.parse(localStorage.getItem("Admin"));

    return (
        <div>  
            <Switch>
                <Route path="/admin">
                        <AdminNavbar />
                    {Admin ? (
                        <Switch>
                            <Route path="/admin/adminpanel" exact component={AdminPanel}/>
                            <Route path="/admin/Products" exact  component={Products}/>
                            <Route path="/admin/Users" exact  component={AdminUsers}/>
                            <Route path="/admin/Orders" exact  component={AdminOrders}/>
                            <Route path="/admin/Order/:orderId" exact component={AdminSingleOrder}/>
                            <Route path="/admin/user/:userId" exact component={AdminSingleUser} />
                            <Route path="/admin/createProduct" exact component={CreateProduct}/>
                            <Route path="/admin/product/:productId" exact component={SingleAdminProduct}/>
                            <Route path="/admin/updateProduct/:productId" exact component={UpdateProduct}/>
                            <Redirect to="/admin/adminpanel"/>
                        </Switch>
                    ) : (
                        <Switch>
                            <Route exact path="/admin" component={AdminSignIn}/>
                            <Redirect to="/admin" />
                        </Switch>
                    ) }
                    
                </Route>
                <Route path="/">
                        <UserNavbar />
                    {User ? (
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/Cart" component={Cart}/>
                            <Route path="/product/:productId" exact component={SingleProduct}/>
                            <Route path="/ShippingInfo" exact component={ShippingInfo}/>
                            <Route path="/Orders/:userId" exact component={Orders}/>
                            <Route path="/Order/:orderId" exact component={SingleOrder}/>
                        </Switch>
                    ) : (
                        <Switch>
                            <Route exact path="/SignUp" component={SignUp}/>
                            <Route exact path="/SignIn" component={SignIn}/>
                            <Route exact path="/ForgetPassword" component={ForgetPassword}/>
                            <Route exact path="/" component={ShowProducts}/>
                            <Redirect to="/SignIn" />
                        </Switch>
                    )}
                </Route>
            </Switch>
        </div>
    )
}
