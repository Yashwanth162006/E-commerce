const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    refToProducts: {
        type: [{productId: mongoose.Schema.ObjectId,qty: Number}],
        ref: 'Product',
        required: [true,'An order cannot be empty']
    },
    refToUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true,'An order should know who ordered it']
    },
    dateOfOrder: {
        type: Date,
        default: Date.now()
    },
    address: {
        type: {
            address: String,
            city: String,
            postalCode: String,
            country: String
        },
        required: [true,'An order must have a delivery address']
    }
})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order