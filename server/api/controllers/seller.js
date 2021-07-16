const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports.signup =  async function(req, res){
    try {
        if(req.body.password != req.body.confirmPassword){
            return res.status(422).json({
                message: "passwords don't match"
            });
        }
    
        User.findOne({email: req.body.email}, async function(err, user){
            if(err){
                return res.status(500).json({
                    message: "Error finding user while signing up"
                });
            }
    
            if(!user){
    
                const { name,  email, password, phone} = req.body;
                const newUser = new User({
                    name,
                    email,
                    password,
                    phone,
                    role: 'seller'
                })
                
                const registered = await newUser.save();
                
                return res.status(200).json({
                    
                    message: "Sign up successful"
                });
            }else{
                return res.status(400).json({
                    message: "Seller already signed up"
                })
                
            }
        })
    } catch (err) {
        console.log("*****", err);
        return res.status(500, {
            message: "Internal Server Error"
        });
    }
}

module.exports.login = async function(req, res){

    try {
        let user = await User.findOne({email: req.body.email});
        const password = req.body.password;

        bcrypt.compare(password, user.password, function(err, result){ 
            if(!user || !result){
               
                return res.status(422).json({
                    message: "Invalid username or password"
                });
            }
            if(result && user.role === 'seller')
            {    return res.status(200).json({
                    message: "Hello",
                    
                    user: {name: user.name, email: user.email, role: user.role},
                    
                    token: jwt.sign({
                            userId: user._id, role: user.role
                        }, process.env.JWT_SECRET, {expiresIn: '1h'})
                    
                });
            }else{
                return json() 
            }
        });

    } catch (err) {
        console.log("*****", err);
        return res.status(500, {
            message: "Internal Server Error"
        });
    }
}


