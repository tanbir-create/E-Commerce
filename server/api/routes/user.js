const express = require('express');
const passport = require('passport');
const { userMiddleware, isAuthenticated} = require('../middlewares/middleware')

const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup',  userController.signup);
router.post('/login', userController.login);


module.exports = router;