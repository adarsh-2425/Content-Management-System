const express = require('express');
const router = express.Router();
const Category = require('../models/category');



// Add Category
router.post('/addcategory',(req,res)=>{
    let newCategory = new Category({
        category : req.body.category
    });

    Category.addCategory(newCategory, (err,post)=>{
        if(res.status(200)){
            res.json({success:true, msg:'Category added successfully'})
        }
        else{
            res.json({success:false, msg: 'Cannot add category at the moment!'})
        }
    })
});

// View Categories
router.get('/viewcategory',(req,res)=>{
    Category.find()
    .then(function(category, err){
        res.send(category);
        if (err) throw err;
    })
    
});

// Delete Category
router.delete('/remove/:id',(req,res)=>{
    const id = req.params.id;
    Category.findByIdAndDelete({"_id": id})
    .then(()=>{
        console.log('Deletion Success');
        res.send();
    })
});

module.exports = router;