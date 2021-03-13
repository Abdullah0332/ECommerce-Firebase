const express= require('express');  

const router = express.Router();

const authJWT = require("../middleware/authJWT");

const Controller = require('../controller/shop');

router.get('/products', authJWT, Controller.getProducts);

router.get('/showProducts', Controller.getShowProducts);

router.get('/cart', authJWT, Controller.getCart);

router.get('/product/:productId', authJWT, Controller.singleProduct);

router.get('/getorder/:userId', authJWT, Controller.getOrder);

router.get('/order/:orderId', authJWT, Controller.getSingleOrder);

router.get('/invoice/:orderId', authJWT, Controller.getInvoice);


router.post('/createProduct', authJWT, Controller.createProduct);

router.post('/addToCart', authJWT, Controller.postAddToCart);

router.post('/deleteItemFromCart', authJWT, Controller.postDeleteItemFromCart);

router.post('/postorder', authJWT, Controller.postOrder);


router.delete('/delete/:productId', authJWT, Controller.deleteProduct);


router.patch('/updateProduct/:productId', authJWT, Controller.UpdateProduct);

module.exports = router;