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
    
                
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    phone: req.body.phone
                })
                
                const registered = await newUser.save();
                
                return res.status(200).json({
                    
                    message: "Sign up successful"
                });
            }else{
                return res.status(400).json({
                    message: "User already signed up"
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

            return res.status(200).json({
                message: "Hello",
                
                user: {name: user.name, email: user.email, role: user.role, _id: user._id},
                data: {
                    token: jwt.sign({
                        userId: user._id, role: user.role
                    }, process.env.JWT_SECRET, {expiresIn: '1h'})
                }
            });
        });

    } catch (err) {
        console.log("*****", err);
        return res.status(500, {
            message: "Internal Server Error"
        });
    }
}




