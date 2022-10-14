const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//REGISTER
router.post('/register', (req,res,next)=>{
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err,user)=>{
        if(err){
            res.json({success: false, msg:'Failed to register user' })
        }
        else{
            res.json({success: true, msg:'User Registered' })

        }
    })
});

// Authenticate
router.post('/authenticate', (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User Not Found'})
        }

        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 604800 //1 Week

                });
                res.json({
                    success:true,
                    token:`Bearer ${token}`,
                    user: {
                        id: user._id,
                        name: user.firstName + " " + user.lastName,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else{
            return res.json({success: false, msg: 'Wrong Password'});
            }
        });
    });
});

//PROFILE
router.get('/profile', passport.authenticate('jwt', {session:false}), (req,res,next)=>{
    res.json({user: req.user});
});


module.exports = router;

// if we want to protect a route, paste this code as second parameter
//passport.authenticate('jwt', {session:false})