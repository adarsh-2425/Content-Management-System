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
    newCategory.save(callback);
};

