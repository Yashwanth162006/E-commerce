const express = require('express')
const Router = express.Router()
const categoryController = require('../Controllers/categoryController')
const authController = require('../Controllers/authController')

Router.route('/').get(categoryController.getCategoryList)
.post(authController.protect,authController.isAdmin,categoryController.createCategory)

module.exports = Router