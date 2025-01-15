const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const app = require('./app')
const mongoose = require('mongoose')
const DB = process.env.DATABASE

mongoose.connect(DB).then(()=>{
    console.log('Database connected')
})

const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`listening to requests on port ${port}`)
})
