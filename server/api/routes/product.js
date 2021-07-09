const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const IMAGE_PATH = ('/uploads/product_images');
const {isAuthenticated, sellerMiddleware} = require('../middlewares/middleware')




const productController = require('../controllers/products');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname ,'../..', IMAGE_PATH));
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '_' + Date.now());
    }

});
const upload = multer({storage: storage});

router.post('/add', isAuthenticated, sellerMiddleware, upload.array('images', 5), productController.addProduct); 

module.exports = router;