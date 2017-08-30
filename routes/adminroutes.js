const {Comment} = require('../models/comment'),
      {User} = require('../models/user'),
      {Article} = require('../models/article');

exports.deleteComment = (req, res) => {
    Comment.find({_id: req.params.ID}).remove().then(() => {
        res.redirect('back');
    }).catch((err) => {
        console.log(err.mesage);
    })
}

exports.deleteUser = (req, res) => {
    User.find({_id: req.params.ID}).remove().then(() => {
        res.redirect('back');
    }).catch((err) => {
        console.log(err.mesage);
    })
}

exports.deleteArticle = (req, res) => {
    Article.find({_id: req.params.ID}).remove().then(() => {
        res.redirect('back');
    }).catch((err) => {
        console.log(err.mesage);
    })
}