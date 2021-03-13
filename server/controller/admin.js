const User = require("../model/users");
const Product = require('../model/products');
const Order = require('../model/orders');
const jwt = require("jsonwebtoken");

// Admin Sign In

exports.postAdminSignIn = async (req, res, next) => {

    const { email, password } = req.body;
    try{
        let user =  await User.findOne({ email });

        if(!user){
            return res.status(400).json({ error: "User Not exists" });
        }

        const passwordIsValid = password === user.toObject().password;

        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.secret, {
            expiresIn: 86400 // 24 hours
        });
    
        res.status(200).send({
            id: user._id,
            accessToken: token,
        });

    }catch{
        console.log(err)
    }
}

// Counts

exports.getCounts = async ( req, res, next ) => {
    const users = await User.find({isVerified: true});
    const products = await Product.find();
    const orders = await Order.find();
    res.status(200).send({
        users: users.length,
        products: products.length,
        orders: orders.length
    })
}

// Get Users

exports.getUsers = async (req, res, next) => {

    try{

        const users = await User.find({isVerified: true});

        if(users.length !== 0){
            res.status(200).json(users)
            console.log("run")
        } else (
            res.status(200).json({ userCount: users.length})
        )
        
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}
    
// Get Orders

exports.getOrders = async (req, res, next) => {

    const orders = await Order.find();

    if(orders.length !== 0){
        res.status(200).json(orders)
    } else (
        res.status(200).json({ orderCount: orders.length})
    )

    // res.json(order)
}

// Show Single Order Preview

exports.getSingleOrder = async (req, res, next) => {

    const orderId = req.params.orderId;

    const order = await Order.findById(orderId)

    res.json(order)
}

// Show Single Order Preview

exports.getSingleUser = async (req, res, next) => {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    const order = await Order.find({ userId: userId });

    res.json({ user : user, order : order})
}