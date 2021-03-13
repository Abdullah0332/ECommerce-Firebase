const express = require("express");
const router = express.Router();

const UserController = require("../controller/users");

router.post("/SignUp", UserController.postSignUp);

router.post("/SignIn", UserController.postSignIn);

module.exports = router;