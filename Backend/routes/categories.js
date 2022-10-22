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

// Update Category
router.put('/update',(req,res)=>{
    id = req.body._id,
    category = req.body.category,
    Category.findByIdAndUpdate({"_id":id},
    {
        $set : {
                    "category" : category
        }
    })
    .then(function(){
        res.send();
    });
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

// Get Category By ID
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    Category.findOne({"_id":id})
    .then((category) => {
        res.send(category)
    });
})


module.exports = router;