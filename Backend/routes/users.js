const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

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

//AUTHENTICATE
router.get('/authenticate', (req,res,next)=>{
    res.send('AUTHENTICATE')
});

//PROFILE
router.get('/profile', (req,res,next)=>{
    res.send('PROFILE')
});


module.exports = router;