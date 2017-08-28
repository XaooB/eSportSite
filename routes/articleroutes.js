const 
    {Article} = require('../models/article'), 
    {User} = require('../models/user'), 
    {Comment} = require('../models/comment'), 
    {getDate} = require('./../public/js/getDate');

exports.article = (req, res) => {
    Article.findOne({
        title: req.params.title
    }).then((mainArticle) => {
        return Article.find({
            author: mainArticle.author
        }).then((authorArticle) => {
            return Article.find({}).where('title').ne(req.params.title).sort('-date').then((newestArticles) => {
                return User.findOne({
                    username: mainArticle.author
                }).then((authorData) => {
                    return Comment.find({
                        title: mainArticle.title
                    }).sort('-date').then((comments) => {
                        res.render('news', {
                            title: mainArticle.title,
                            mainNews: mainArticle,
                            lastestNews: newestArticles,
                            authorArticle: authorArticle,
                            author: authorData,
                            comments: comments
                        });
                    })
                });
            });
        });
    }).catch((err) => {
        console.log(err);
        res.redirect('/error').send();
    });
}

exports.more = (req, res) => {
    res.render('moreNews', {
        title: 'Więcej artykułow'
    })
}

exports.all = (req, res) => {
    res.render('archives', {
        title: 'Wiadomości'
    });
};

exports.addComment = (req, res) => {
    let newComment = Comment({
        username: req.session.user.username,
        body: req.body.tresc,
        title: req.params.title,
        date: getDate()
    }).save().then(() => {
        res.redirect('back'); //to news page
    }).catch((err) => {
        console.log(err.message);
    })
};

exports.addNew = (req, res) => {
    res.render('admin_newPost', {
        layout: 'adminPanel'
    });
}

exports.postArticle = (req, res) => {
    let newArticle = new Article({
        title: req.body.title,
        category: req.body.category,
        author: req.user.username,
        desc: req.body.desc,
        date: getDate(),
        isMain: req.body.name.value
    }).save().then(() => {
        console.log('Saved');
    }).catch((err) => {
        console.log(err.message);
    })
}