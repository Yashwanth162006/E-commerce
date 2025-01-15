const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    src1:{
        type: String,
        required: [true,'A product must have src1']
    },
    name:{
        type: String,
        required: [true,'A product must have name'],
        unique: true
    },
    brand:{
        type: String,
        required: [true,'A product must have a brand']
    },
    description:{
        type: String,
        required: [true,'A product must have a description'],
        trim: true
    },
    price:{
        type: Number,
        required: [true,'A product must have a price']
    },
    stock:{
        type: Number,
        required: [true,'A product must have stock']
    },
    quantity:{
        type: Number,
        required: [true,'A product must have quantity']
    },
    rating:{
        type: Number,
        default: 4
    },
    category:{
        type: String,
        required: [true,'A product must have category']
    }
})

const Product = mongoose.model('Product',productSchema)
module.exports = Product