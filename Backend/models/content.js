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
    upVote: {
        type: Number
    },
    downVote: {
        type: Number
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



// {
// 	"authorName":"adarshlol",
// 	"category":"Science fiction",
// 	"post":"lol happens",
// 	"image":"https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png",
// 	"upvote":3,
// 	"downVote":-2
// }

