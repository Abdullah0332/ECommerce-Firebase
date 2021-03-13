const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    imageURL: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean
    },
    cart:{
        items:[
            {
                productId:{ type: Schema.Types.ObjectId, ref:'Product', required:true},
                quantity:{ type: Number, default: 1, required:true },
                price:{ type: Number, required:true },
                productTitle:{ type: String, required:true },
                description:{ type:String, required:true },
                imageURL: { type: String }, 
            }
        ]
    }
}, {timestamps: true});

module.exports = mongoose.model('User',userSchema);