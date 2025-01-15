const Review = require('../Models/reviewModel')

exports.getProductReviews = async(req,res)=>{
    try{
        const productReviews = await Review.find({refToProduct: req.params.productId})
        res.status(200).json({
            status: 'success',
            data:{
                reviews: productReviews
            }
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
exports.getProductReviewByUser = async(req,res)=>{
    try{
        const productReview = await Review.find({refToProduct: req.params.productId,refToUser: req.user._id})
        res.status(200).json({
            status: 'success',
            data:{
                review: productReview
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: 'Could not fetch you the review'
        })
    }
}
exports.doesReviewExists = async(req,res,next)=>{
    try{
        if(await Review.findOne({refToProduct: req.params.productId,refToUser: req.user._id})){
            return res.status(200).json({
                status: 'fail',
                message: 'Can write only one review'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'No review'
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: 'failed to write the review'
        })
    }
}
exports.writeProductReview = async(req,res)=>{
    try{
        if(await Review.findOne({refToProduct: req.params.productId,refToUser: req.user._id})){
            return res.status(401).json({
                status: 'fail',
                message: 'Can write only one review'
            })
        }
        const userId = req.user._id
        const review = await Review.create({...req.body,refToProduct:req.params.productId,refToUser: userId})
        res.status(200).json({
            status: 'success',
            data: {
                review
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: 'Failed to write the review'
        })
    }
}
exports.updateProductReview = async(req,res)=>{
    try{
        const review = await Review.findOne({refToProduct: req.params.productId,refToUser: req.user._id})
        if(req.body.rating){
            review.rating = req.body.rating
        }
        if(req.body.review){
            review.review = req.body.review
        }
        review.createdAt = Date.now()
        await review.save()
        res.status(200).json({
            status: 'success',
            data: {
                updatedReview: review
            }
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
exports.deleteProductReview = async(req,res)=>{
    try{
        await Review.findOneAndDelete({refToProduct: req.params.productId,refToUser: req.user._id})
        res.status(200).json({
            status: 'success',
            message: 'Review deleted successfully'
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}