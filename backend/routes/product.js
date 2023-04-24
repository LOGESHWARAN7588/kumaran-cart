const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles  } = require('../middlewares/authenticate');



router.route('/products').get(isAuthenticatedUser ,getProducts);
router.route('/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/products/:id').get(getSingleProduct);
router.route('/products/:id').put(updateProduct);
router.route('/products/:id').delete(deleteProduct);




module.exports = router