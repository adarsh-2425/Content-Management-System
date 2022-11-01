const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const { find } = require('../models/user');
const { addContent } = require('../models/content');

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

//Show list of users
router.get('/userlist',function(req,res){
    // Find all except one in mongodb
    // Use $ne for one user db.user.find( {_id:{$ne:"5848e9ecaec0f31372816a26"} })
    User.find({ _id: { $ne: "634ce3f083c2d80488f65db1"} })
                    .then(function(users){
                        res.send(users);
                    });   
});

// Update User
router.put('/updateuser',(req,res)=>{

    id=req.body._id,
    role = req.body.role,
   User.findByIdAndUpdate({"_id":id},
                                {$set:{"role":role}})
   .then(function(){
       res.send();
   })
 })

//  Delete User
router.delete('/delete/:id', (req,res)=>{
    id = req.params.id;
    User.findByIdAndDelete({"_id":id})
    .then(()=>{
        res.send();
    })
});

//  Search User based on id
 router.get('/:id',  (req, res) => {
      
    User.findById(req.params.id)
      .then((user)=>{
          res.send(user);
      });
  })

//  Search user based on username
router.get('/userpost/:username', (req,res)=>{
    username = req.params.username;
    // findone returns Object
    // find returns Array
    User.findOne({username})
    .then((users)=>{
        res.send(users)
    });
}) ;


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
                        email: user.email,
                        role: user.role
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
     res.json(req.user[0]);
     
});




module.exports = router;

// if we want to protect a route, paste this code as second parameter
//passport.authenticate('jwt', {session:false})