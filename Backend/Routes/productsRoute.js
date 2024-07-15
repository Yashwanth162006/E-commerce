const express = require('express')
const router = express.Router()
const productsController = require('../Controllers/productsController')
const authController = require('../Controllers/authController')
router.route('/top-5').get(productsController.topProducts,productsController.getAllProducts)
router.route('/').get(productsController.getAllProducts).post(authController.protect,authController.isAdmin,productsController.createProduct)
router.route('/:id').get(productsController.getProductById).patch(authController.protect,authController.isAdmin,productsController.updateProduct).delete(authController.protect,authController.isAdmin,productsController.deleteProduct)

module.exports = router