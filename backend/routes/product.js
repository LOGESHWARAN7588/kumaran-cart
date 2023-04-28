const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles  } = require('../middlewares/authenticate');



router.route('/products').get(isAuthenticatedUser ,getProducts);
router.route('/products/:id').get(getSingleProduct);
router.route('/products/:id').put(updateProduct);
router.route('/products/:id').delete(deleteProduct);


router.route('/review').put(isAuthenticatedUser, createReview);
router.route('/reviews').get(getReviews);




//Admin rotes
router.route('admin/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);





module.exports = router