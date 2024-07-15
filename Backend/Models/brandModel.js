const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true,'A brand is required'],
        unique: [true,'This brand already exists']
    }
})
const Brand = mongoose.model('Brand',brandSchema)
brandSchema.pre('create',async(next)=>{
    const brand = await Brand.findOne({brand: req.body.brand})
    if(brand){
        return res.status(404).json({
            status: 'fail',
            message: 'Brand already exists'
        })
    }else{
        next()
    }
})
module.exports = Brand