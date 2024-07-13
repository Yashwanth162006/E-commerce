const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true,'A category is required'],
        unique: [true,'This category already exists']
    }
})
const Category = mongoose.model('Category',categorySchema)
categorySchema.pre('create',async(next)=>{
    const category = await Category.findOne({category: req.body.category})
    if(category){
        return res.status(404).json({
            status: 'fail',
            message: 'Category already exists'
        })
    }else{
        next()
    }
})
module.exports = Category