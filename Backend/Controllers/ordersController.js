const Order = require('../Models/ordersModel')

exports.allMyOrders = async(req,res)=>{
    try{
        //Finding out the userId
        const userId = req.user._id
        //Finding all the orders of the user
        const orders = await Order.find({refToUser: userId})
        //sending the orders to the user
        res.status(200).json({
            orders
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: 'Failed to fetch your orders'
        })
    }
}
exports.currentOrder = async(req,res)=>{
    try{
        //Finding out the userId
        const userId = req.user._id
        //Placing the order
        console.log(req.body)
        const order = await Order.create({...req.body,refToUser: userId})
        //sending the response
        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: 'Order not placed'
        })
    }
}
exports.getAllOrders = async(req,res)=>{
    try{
        const orders = await Order.find()
        res.status(200).json({
            status: 'success',
            data: {
                orders: orders
            }
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: 'Failed to fetch the orders'
        })
    }
}