const express = require('express');
const router = express.Router();


router.use('/users', require('./user'));

console.log("Router loaded");

module.exports = router;
