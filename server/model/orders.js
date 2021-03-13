const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const orderSchema= new Schema({
   
    name:{type: String, required: true},
    email:{type: String, required: true},
    userId:{type: Schema.Types.ObjectId, ref:'User', required:true},
    shipping_information: {
        firstName:{type:String},
        lastName:{type: String},
        customer_email:{ type: String},
        phone_number:{ type: String},
        province:{type:String},
        city:{type: String},
        post_code:{ type: String},
        shipping_address:{ type: String},
        payment_method:{type:String},
        Transaction_SS:{type: String},
    },
    products:[
        {
            productId:{type:Object, required: true},
            quantity:{type: Number, required:true},
            price:{ type: Number, required:true },
            productTitle:{ type: String, required:true }    
        }
    ],

}, {timestamps: true});

module.exports = mongoose.model('Order',orderSchema);