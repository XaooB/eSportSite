const mongoose = require('mongoose');
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
        type: Date,
        default: Date.now()
    },
    img: String
});

var Article = mongoose.model('Article', articleSchema);

module.exports = {
    Article
};
