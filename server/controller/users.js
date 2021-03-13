const User = require("../model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Sign Up

exports.postSignUp = async (req, res, next) => {
    const {name, email, password, imageURL} = req.body;
    
    try{
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ error: "User already exists" });
        }
    const hashed_password = await bcrypt.hash(password, 10);
    user = new User({
        name,
        email,
        password: hashed_password,
        imageURL,
        cart: { items : [] },
        isVerified: false
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
    }catch(err){
        console.log(err)
    }
}

// User Sign In

exports.postSignIn = async (req, res, next) => {
    const { email } = req.body;

    try{
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ error: "No User Exist with this Email" });
        }
        if (user) {
            await User.update({email: req.body.email},{"$set": {"isVerified": true}})
            const token = jwt.sign({ _id: user._id }, process.env.secret, {
                expiresIn: "1h",
            });
            return res.json({
                accessToken: token,
                userId: user._id,
                name: user.name,
                email: user.email,
            })
        }
    }catch(err){
        console.log(err)
    }
}