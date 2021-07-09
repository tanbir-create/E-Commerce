const express = require('express');
const router = express.Router();


router.use('/user', require('./user'));
router.use('/seller', require('./seller'));
router.use('/product', require('./product'));

console.log("Router loaded");

module.exports = router;
