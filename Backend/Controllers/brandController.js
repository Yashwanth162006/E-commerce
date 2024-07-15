const Brand = require('../Models/brandModel')

exports.getBrandList = async(req,res)=>{
    try{
        const brandList = await Brand.find()
        res.status(200).json({
            status: 'success',
            brandList
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: 'Unable to fetch brand list'
        })
    }
}
exports.createBrand = async(req,res)=>{
    try{
        const brand = await Brand.create(req.body)
        res.status(200).json({
            status: 'success',
            brand
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: 'Failed to create brand'
        })
    }
}