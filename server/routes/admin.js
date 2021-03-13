const express = require('express');

const router = express.Router();

const AdminController = require("../controller/admin");

const authJWT = require("../middleware/authJWT");

router.post("/Admin", AdminController.postAdminSignIn);

router.get('/Admin/counts', authJWT, AdminController.getCounts);

router.get('/Admin/users', authJWT, AdminController.getUsers);

router.get('/Admin/orders', authJWT, AdminController.getOrders)

router.get('/Admin/order/:orderId', authJWT, AdminController.getSingleOrder)

router.get('/Admin/user/:userId', authJWT, AdminController.getSingleUser);

module.exports = router;