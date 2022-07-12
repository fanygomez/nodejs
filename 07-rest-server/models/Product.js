const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[ true, 'El nombre es obligatario' ],
        unique:true,
        index:true,
    },
    status:{
        type:Boolean,
        default:true,
        required:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price:{
        type: Number,
        default:0,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true,
    },
    description:{ type: String},
    available: { type: Boolean, default: true }
});

ProductSchema.methods.toJSON = function () {
    const { __v, status, ...data} = this.toObject();
    return data;
}
//Export the model
module.exports = mongoose.model('Product', ProductSchema); 