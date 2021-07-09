const User = require('../models/user');
const Product = require('../models/product');

module.exports.addProduct = async function(req, res){
    try {

        
        const {name, price, description} = req.body;
        let images = [];
        if(req.files.length>0){
            images = req.files.map(file => {
                return { img: file.filename}
            })
        }
        const product = new Product({
            name,
            price,
            description,
            images,
            seller: req.user.userId
            
        });

         const pro= await product.save();
         return res.status(200).json({product});
        
     } catch (error) {
       return res.status(404).json('Error in creating product');
    }
 }