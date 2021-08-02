const express = require('express');
const passport = require('passport');
const { userMiddleware, isAuthenticated} = require('../middlewares/middleware')

const router = express.Router();
const userController = require('../controllers/user');
const { deleteItem, getCart } = require('../controllers/cart')
const { route } = require('./product');

router.post('/signup',  userController.signup);
router.post('/login', userController.login);
router.get('/profile', isAuthenticated, userMiddleware, userController.getUser);
router.delete('/cart/delete/:id', isAuthenticated, userMiddleware, deleteItem);
router.get('/cart', isAuthenticated, userMiddleware, getCart);


module.exports = router;