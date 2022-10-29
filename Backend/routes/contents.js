const express = require('express');
const router = express.Router();
const Content = require('../models/content');


// View Contents From The Blog
router.get('/viewcontent', (req,res)=>{
    Content.find()
    .then(function(contents,err){
        res.send(contents);
        if(err) throw err;
    });
});



router.get(`/:id`, (req,res)=>{
    const id = req.params.id;
    Content.findOne({"_id":id})
    .then((content)=>{
        res.send(content);
    })
})


// Post Contents To The Blog
router.post('/postcontent', (req, res)=>{
    let newContent = new Content({
        authorName: req.body.authorName,
        category: req.body.category,
        title: req.body.title,
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



// View Contents By the Author
// https://www.baeldung.com/mongodb-get-value-by-key-name
router.get('/usercontent/:username', (req,res)=>{
    username = req.params.username;
    Content.find({"authorName" : username})
    .then(function(contents,err){
        res.send(contents);
        if(err) throw err;
    });
});
// View Post by Category
router.get('/viewbycategory/:category',(req,res)=>{
    category = req.params.category;
    Content.find({"category":category})
    .then(function(contents,err){
        res.send(contents);
        if (err) throw err;
    });
});

// Update Content
router.put('/updatecontent',(req,res)=>{
    id = req.body._id,
    title = req.body.title,
    category = req.body.category,
    image = req.body.image,
    post = req.body.post,
    Content.findByIdAndUpdate({"_id":id},
    {
        $set:{
            "title":title,
            "category":category,
            "image":image,
            "post":post
        }
    })
    .then(function(){
        res.send();
    });
});

// Delete Contents From The Blog
router.delete('/delete/:id',(req,res)=>{
    id = req.params.id;
    Content.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('Deletion success')
        res.send();
    })
});




module.exports = router;