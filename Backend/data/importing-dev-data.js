const fs = require('fs')

const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const mongoose = require('mongoose')
const DB = process.env.DATABASE
mongoose.connect(DB).then(()=>{
    console.log('connected to database')
})

const Product = require('../Models/productModel')

const products = fs.readFileSync(`${__dirname}/products.json`,'utf-8')
const productsObj = JSON.parse(products)

const insertData = async()=>{
    try{
        await Product.create(productsObj)
        console.log('Data loaded successfully')
        process.exit()
    }catch(err){
        console.log(err)
    }
}
const deleteData = async()=>{
    try{
        await Product.deleteMany()
        console.log('Data deleted')
        process.exit()
    }catch(err){
        console.log(err)
    }
}

if(process.argv[2]==='--import'){
    insertData()
}else if(process.argv[2]==='--delete'){
    deleteData()
}