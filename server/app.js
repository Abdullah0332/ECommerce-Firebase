const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const productsRoute = require('./routes/shop');
const usersRoute = require('./routes/users');
const adminRoute = require('./routes/admin');

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));

app.use(cors());

app.get('/',(req, res) => {
    res.send("Hello to E Commerce API")
})

app.use(productsRoute);
app.use(adminRoute);
app.use(usersRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, 
    { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
    }).then(() => {
        app.listen(PORT, 
            () => {
                console.log(`PORT is Running on PORT ${PORT}`)
            })
    }).catch(error => {
        console.log("MongoDB Connection ERROR :", error)
    })

mongoose.set("useFindAndModify", false);