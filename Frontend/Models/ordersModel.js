const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    refToProducts: {
        type: [mongoose.Schema.ObjectId],
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
    }
})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order