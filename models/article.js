const mongoose = require('mongoose'),
    {getDate} = require('./../public/js/getDate');
mongoose.Promise = global.Promise;

const articleSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    title: String,
    category: String,
    author: String,
    body: String,
    date: {
        type: String,
        default: getDate()
    },
    img: String
});

var Article = mongoose.model('Article', articleSchema);

module.exports = {
    Article
};
