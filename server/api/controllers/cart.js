const Cart = require('../models/cart');
// const Product  = require('../models/product');
// const User = require('../models/user');


module.exports.create = async (req, res) =>{
    
    try {
        let cart = await Cart.findOne({user: req.user.userId});
        if(cart){
            let reqProduct = req.body.items.product;
            const existItem = cart.items.find(x => (x.product == reqProduct));
            
            if(existItem){
                existItem.quantity += req.body.items.quantity;
            }else{
                cart.items.push({quantity: req.body.items.quantity, product: reqProduct});           
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        }else{
            
            
            const newCart = new Cart({
                user: req.user.userId,
                items: [req.body.items]
            });

            const cart = await newCart.save();

            return res.status(200).json({cart});
        
        }
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.deleteItem = async (req, res) => {
    try {
        let cart = await Cart.findOne({user: req.user.userId});
    

        let item = await cart.items.find(i=>i._id == req.params.id);
        
        item.remove();

        if(cart.items.length === 0){
            Cart.deleteOne({_id: cart.id}, (err, deleted)=>{
                if(err){return status(500).send(err)}

                return res.status(200).json({message: "Cart empty"});
            });
            
        }
        // console.log(cart.items.length);
        else{
            cart.save();
            return res.status(200).json({success: true});
        }
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.getCart = async (req, res)=> {

  try {
    let cart = await Cart.findOne({user: req.user.userId});
    if(!cart){
        return res.status(200).json("Your cart is empty");
    }
    
    return res.status(200).json({cart});

  } catch (error) {
      return res.status(500).send(error);
  }

}

