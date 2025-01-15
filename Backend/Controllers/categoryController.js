const Category = require('../Models/categoryModel')

exports.getCategoryList = async(req,res)=>{
    try{
        const categoryList = await Category.find()
        res.status(200).json({
            status: 'success',
            categoryList
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: 'Unable to fetch category list'
        })
    }
}
exports.createCategory = async(req,res)=>{
    try{
        const category = await Category.create(req.body)
        res.status(200).json({
            status: 'success',
            category
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: 'Failed to create category'
        })
    }
}