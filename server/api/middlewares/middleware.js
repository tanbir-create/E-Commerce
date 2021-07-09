 const jwt = require('jsonwebtoken');

 //to check if user/seller is signed in to modify
 module.exports.isAuthenticated = function (req, res, next){
          try {
            
            if(req.headers.authorization){
                const token = req.headers.authorization.split(" ")[1];
                const user = jwt.verify(token, process.env.JWT_SECRET);
                req.user = user;
               
            }else{
                return res.status(400).json({message: "Access Denied"})

            }
            

        next();
      } catch (error) {
          return res.status(401).json("Error");
      }
     
 }

 module.exports.userMiddleware = function(req, res, next) {
    if(req.user.role !== 'user'){
        return res.status(400).json({message: "Not registered a User"});
    } 
    next();
}

 //middleware to authorize seller to modify
 module.exports.sellerMiddleware = function(req, res, next) {
     if(req.user.role !== 'seller'){
         return res.status(400).json({message: "Not registered a Seller, register now?"});
     } 
     next();
 }
 
