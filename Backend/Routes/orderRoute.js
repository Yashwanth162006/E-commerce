const express = require('express')
const Router = express.Router()
const ordersController = require('../Controllers/ordersController')
const authController = require('../Controllers/authController')

Router.route('/user').get(authController.protect,ordersController.allMyOrders).post(authController.protect,ordersController.currentOrder)
Router.route('/admin').get(authController.protect,authController.isAdmin,ordersController.getAllOrders)
module.exports = Router
