const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
// User Schema
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.find(id, callback);
}

module.exports.getUserByUserName = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(newUser.password, salt, (err,hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if (err) throw err;
        callback(null, isMatch);
    });
}

// {
// 	"firstName":"adarsh",
// 	"lastName":"lol",
// 	"gender":"male",
// 	"phone":"12345678",
// 	"email":"adarsh@gmail.com",
// 	"username":"adarshlol",
// 	"password":"12345678"
// }