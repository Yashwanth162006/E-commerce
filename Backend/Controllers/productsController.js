const Product = require('../Models/productModel')

exports.topProducts = async(req,res,next)=>{
    try{
        req.query.limit = '5'
        req.query.sort = '-rating,price'
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
    next()
}
exports.getAllProducts = async(req,res)=>{
    try{
        console.log(req.query)
        // Excluding specific fields
        let queryObj = {...req.query}
        const excludedFields = ['page','sort','limit','fields']
        excludedFields.forEach(el => delete queryObj[el])
        // Handling gte/gt/lte/lt
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
    
        let query = Product.find(JSON.parse(queryStr))
        //sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
            console.log(sortBy)
        }
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        }
        if(req.query.page || req.query.limit){
            const page = req.query.page*1 || 1
            const limit = req.query.limit*1 || 10
            const skip = (page-1)*limit
            query = query.skip(skip).limit(limit)
        }
        const products = await  query
        res.status(200).json({
            products
        })
    }
    catch(err){
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
exports.getProductById = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json({
            product
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
exports.createProduct = async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json({
            message: 'Product Created',
            productId: product._id
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: 'Failed to create product'
        })
    }
}
exports.updateProduct = async(req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({
            status: 'success',
            message: 'product updated successfully'
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: 'Failed to update'
        })
    }
}
exports.deleteProduct = async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(400).json({
            status: 'success',
            message: 'deleted'
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}