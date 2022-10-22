const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category:{
        type: String,
        require : true
    }
});

const Category = module.exports = mongoose.model('category', CategorySchema);

// Saving Contents To The Database

module.exports.addCategory = function(newCategory,callback){
    const category = newCategory.category;
    Category.findOne({"category":category}, (err,data)=>{
    if (err) throw err;

    else if (data === null || !data) {
        newCategory.save(callback);
    } else {
        callback('lol')
    }
});
}


    

