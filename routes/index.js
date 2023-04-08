const express = require('express');
const router = express.Router();
const productController = require('../controller/product_controller');


router.get('/products', productController.product); //Get all product
router.post('/products/create', productController.create); // Add a new product
router.delete('/products/:id', productController.destroy ); // Delete product
router.post('/products/:id/update_quantity', productController.update); // Update product quantity


module.exports = router;