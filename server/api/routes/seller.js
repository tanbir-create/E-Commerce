const express = require('express');

const router = express.Router();
const sellerController = require('../controllers/seller');
// const productController = require('../controllers/products');

const { signup, login } = require('../controllers/seller');
const { isAuthenticated } = require('../middlewares/middleware');

router.post('/signup', sellerController.signup);
router.post('/login', sellerController.login);





module.exports = router;