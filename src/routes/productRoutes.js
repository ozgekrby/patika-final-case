const express = require('express');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/add', addProduct);
router.get('/list', getProducts);
router.put('/update', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;