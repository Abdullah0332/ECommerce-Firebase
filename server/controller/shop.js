const Product = require('../model/products');
const mongoose = require('mongoose');
const User = require('../model/users');
const Order = require('../model/orders');
const PDFDocument=require('pdfkit');
const fs=require('fs');
const path=require('path');

// Show Products

exports.getProducts = async (req, res, next) => {
    try{
        const product = await Product.find();

        if(product.length !== 0){
            res.status(200).json(product)
        } else (
            res.status(200).json({ productCount: product.length})
        )
        
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

exports.getShowProducts = async (req, res, next) => {
    try{
        const product = await Product.find();

        if(product.length !== 0){
            res.status(200).json(product)
        } else (
            res.status(200).json({ productCount: product.length})
        )
        
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

// Admin Create Product

exports.createProduct = async (req, res, next) => {

    const { title, price, imageURL, description } = req.body;

    const newProduct = new Product({ 
        title, 
        price, 
        imageURL, 
        description });

    try{
        await newProduct.save();
        res.status(201).json(newProduct);
    }catch (error){
        res.status(409).json({ message: error.message })
        console.log(error)
    }
}

// Admin Delete Product

exports.deleteProduct = async (req, res, next) => {
    const prodId = req.params.productId;

    if(!mongoose.Types.ObjectId.isValid(prodId)){
        error = `No Product with id: ${prodId}`
        res.status(404).send({error})
        return;
    }

    const DeletedProduct = await Product.findByIdAndDelete(prodId)

    res.json({ message: "Product Deleted Successfully"})
}

// Single Product

exports.singleProduct = async (req, res, next) => {
    
    const prodId = req.params.productId;

    try{
        const product = await Product.findOne({_id: prodId})

        res.status(200).json(product);
        
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

// Admin Update Product 

exports.UpdateProduct = async (req, res, next) => {
    
    const prodId = req.params.productId;
    
    const { title, price, imageURL, description } = req.body;

    if(!mongoose.Types.ObjectId.isValid(prodId)){
        error = `No Product with id: ${prodId}`
        res.status(404).send({error})
        return;
    }

    const updatedProductObj = new Product({ 
        title, 
        price, 
        imageURL, 
        description,
        _id: prodId });
    
    const updateProduct = await Product.findByIdAndUpdate( prodId, updatedProductObj)

    res.status(200).send({data: updateProduct})
}

// Show Cart

exports.getCart = async (req, res, next) => {

    try{
        const user = await User.findById(req.headers.userid)

        res.status(200).json({ cart: user.cart})
          
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

// Add to Cart
exports.postAddToCart = async (req, res, nex) => {
    
    const user = await User.findById(req.body.userId)

    const product = await req.body.product;
    
    const cartProductIndex = user.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...user.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = user.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
        productId: product._id,
        productTitle: product.title,
        quantity: newQuantity,
        price: product.price,
        description: product.description,
        imageURL: product.imageURL
        });
    }
    const updatedCart = {
        items: updatedCartItems
    };
    user.cart= updatedCart;
    await user.save() 
    res.json({ user })
    
}

// Delete Item From Cart

exports.postDeleteItemFromCart = async (req, res, nex) => {

    const user = await User.findById(req.body.userId)
    const productId = await req.body.productId

    const updatedcart= user.cart.items.filter(i=>{
        return i.productId.toString() !== productId.toString()
    })
    user.cart.items=updatedcart;
    return user.save();
}

// Show Order

exports.getOrder = async (req, res, next) => {
    const userId = req.params.userId;

    const order = await Order.find({ userId: userId })

    res.json(order)
}

// Post / Place Order

exports.postOrder = async (req, res, next) => {

    const user = await User.findById(req.body.User.userId);
    const { name, email } = req.body.User;
    const { firstName, lastName, customer_email, phone_number, province, city, post_code, shipping_address, payment_method, Transaction_SS } = req.body.shippingInfo;
    const product = user.cart.items.map(i => {
        return { quantity:i.quantity, _id:i._id, productId:i.productId, productTitle:i.productTitle,price: i.price }
    })

    const order = new Order({
        name,
        email,
        userId: req.body.User.userId,
        shipping_information: {
            firstName,
            lastName,
            customer_email,
            phone_number,
            province,
            city,
            post_code,
            shipping_address,
            payment_method,
            Transaction_SS
        },
        products: product
    });

    await order.save();
    res.status(204).json(order);

    user.cart.items = [];
    await user.save()
}

// Show Single Order Preview

exports.getSingleOrder = async (req, res, next) => {
    const orderId = req.params.orderId;

    try{
        const order = await Order.findById(orderId)

        if(order.length !== 0){
            res.status(200).json(order)
        } else (
            res.status(200).json({ orderCount: order.length})
        )
    }catch(error){
        res.status(400).json({ message: error.message })
    }

}

// Get Invoice of Single Order

exports.getInvoice = async (req, res, next) => {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);  

    const invoiceName='invoice-'+orderId+'.pdf';
    const invoicePath=path.join('data','invoices',invoiceName);
    
    const pdfDoc= new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-disposition', 'attachment; filename="'+invoiceName+'"');
    
    
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    
    pdfDoc.fontSize(18).text('Invoice');
    pdfDoc.text('______________________________________________');
    pdfDoc.moveDown();
    pdfDoc.fontSize(14).text("OrderId : "+order._id);
    pdfDoc.moveDown();
    pdfDoc.fontSize(10).text("User Name : "+order.name)
    pdfDoc.fontSize(10).text("Email : "+order.email)
    pdfDoc.text('_______________________');
    pdfDoc.moveDown();
    let totalprice=0;
    pdfDoc.fontSize(14).text("Products : ")
    pdfDoc.moveDown();
    order.products.forEach(prod=>{
        totalprice += prod.quantity * prod.price;
        pdfDoc.fontSize(10).text('Product ID : '+prod.productId)
        pdfDoc.fontSize(10).text('Product Title : '+prod.productTitle);
        pdfDoc.fontSize(10).text('Product Quantity : '+prod.quantity);
        pdfDoc.fontSize(10).text('Product Price : '+prod.price);
        pdfDoc.text('_______________________');
        pdfDoc.moveDown();
    });
    pdfDoc.moveDown();
    pdfDoc.fontSize(12).text('Total Price = '+totalprice);
    pdfDoc.moveDown();
    pdfDoc.fontSize(12).text('Total Price With Shipping Charges = '+(totalprice + 250));
    pdfDoc.text('_______________________');
    pdfDoc.moveDown();
    pdfDoc.fontSize(14).text("Shipping Information");
    pdfDoc.moveDown();
    pdfDoc.fontSize(10).text('First Name : '+order.shipping_information.firstName)
    pdfDoc.fontSize(10).text('Last Name : '+order.shipping_information.lastName)
    pdfDoc.fontSize(10).text('Customer Email : '+order.shipping_information.customer_email)
    pdfDoc.fontSize(10).text('Phone Number : '+order.shipping_information.phone_number)
    pdfDoc.fontSize(10).text('Province : '+order.shipping_information.province)
    pdfDoc.fontSize(10).text('City : '+order.shipping_information.city)
    pdfDoc.fontSize(10).text('Post Code : '+order.shipping_information.post_code)
    pdfDoc.fontSize(10).text('Shipping Address : '+order.shipping_information.shipping_address)
    pdfDoc.fontSize(10).text('Payment Method : '+order.shipping_information.payment_method)
    pdfDoc.end();

}