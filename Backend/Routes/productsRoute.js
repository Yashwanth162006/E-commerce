const express = require('express')
const router = express.Router()
const productsController = require('../Controllers/productsController')
const authController = require('../Controllers/authController')
router.route('/top-5-cheap').get(productsController.topProducts,productsController.getAllProducts)
router.route('/').get(productsController.getAllProducts).post(productsController.createProduct)
router.route('/:id').get(productsController.getProductById).patch(productsController.updateProduct).delete(productsController.deleteProduct)

module.exports = router