const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const productsRoute = require('./Routes/productsRoute')
const usersRoute = require('./Routes/usersRoute')
const reviewRoute = require('./Routes/reviewRoute')
const orderRoute = require('./Routes/orderRoute')

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use((req,res,next)=>{
    console.log('Hello from the middleware')
    next()
})
app.use('/api/v1/products',productsRoute)
app.use('/api/v1/users',usersRoute)
app.use('/api/v1/reviews',reviewRoute)
app.use('/api/v1/orders',orderRoute)
module.exports = app