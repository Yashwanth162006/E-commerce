const express = require('express')
const Router = express.Router()
const brandController = require('../Controllers/brandController')
const authController = require('../Controllers/authController')

Router.route('/').get(brandController.getBrandList)
.post(authController.protect,authController.isAdmin,brandController.createBrand)

module.exports = Router