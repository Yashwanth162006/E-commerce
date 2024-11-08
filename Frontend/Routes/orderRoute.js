const express = require('express')
const Router = express.Router()
const ordersController = require('../Controllers/ordersController')
const authController = require('../Controllers/authController')

Router.route('/').get(authController.protect,ordersController.allMyOrders).post(authController.protect,ordersController.currentOrder)

module.exports = Router
