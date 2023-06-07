const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdminProducts } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles  } = require('../middlewares/authenticate');
const { deleteOrder } = require('../controllers/orderController');





router.route('/products').get( getProducts);
router.route('/products/:id').get(getSingleProduct);
router.route('/products/:id').put(updateProduct);
router.route('/products/:id').delete(deleteProduct);


router.route('/review').put(isAuthenticatedUser, createReview);
router.route('/reviews').get(getReviews);
router.route('/review').delete(deleteReview);





//Admin rotes
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);





module.exports = router;