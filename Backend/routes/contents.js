const express = require('express');
const router = express.Router();
const Content = require('../models/content');
const config = require('../config/database');

// Post Contents To The Blog
router.post('/postcontent', (req, res)=>{
    let newContent = new Content({
        authorName: req.body.authorName,
        category: req.body.category,
        post: req.body.post,
        image: req.body.image,
        upVote: req.body.upVote,
        downVote: req.body.downVote
    });
    

    Content.addContent(newContent, (err,post)=>{
        if(res.status(200)){
            res.json({success: true, msg: 'Content Posted Successfully'})
        }
        else{
            res.json({success: false, msg: 'Cannot Post Content At The Moment'})
        }
           
    })
});

// View Contents From The Blog
router.get('/viewcontent', (req,res)=>{
    Content.find()
    .then(function(contents,err){
        res.send(contents);
        if(err) throw err;
    });
});

module.exports = router;