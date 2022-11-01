const mongoose = require('mongoose');

// Content Schema

const ContentSchema = mongoose.Schema({
    authorName: {
        type: String,
    },
    category: {
        type: String,
        require: true
    },
    title: {
        type:String,
        require: true
    },
    post: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    likes: {
      type: Number, 
      default: 0 
    },
    dislikes: {
      type: Number, 
      default: 0 
    }
},
{
    timestamps: true
});

const Content = module.exports = mongoose.model('content', ContentSchema);

// Saving Contents To The Database
module.exports.addContent = function(newContent,callback){
    newContent.save(callback);
};



