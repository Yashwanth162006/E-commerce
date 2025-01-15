const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true,'A review must have a rating'],
        enum: [1,2,3,4,5]
    },
    review: {
        type: String,
        maxlength: [250,'review should be less than 250 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    refToProduct: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true,'A review must know to which product it belongs to']
    },
    refToUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true,'A review must know which user wrote it']
    }
})

const Review = mongoose.model('Review',reviewSchema)
module.exports = Review