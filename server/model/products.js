const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const productSchema= new Schema({
   
    title:{
        type:String,
        required:true
    },
    price: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageURL: {
        type: String,
        required: true
    },
    // productQuantity: {
    //     type: Number,
    //     required: true
    // }
}, {timestamps: true});

module.exports = mongoose.model('Product',productSchema);