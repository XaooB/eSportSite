const mongoose = require('mongoose'),
      {getDate} = require('./../public/js/getDate');
mongoose.Promise = global.Promise;

const commentSchema = mongoose.Schema({
    username: String,
    body: String,
    title: String,
    date: {
        type: String,
        default: getDate() 
    }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Comment
};
