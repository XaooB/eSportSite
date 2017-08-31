const 
    {Article} = require('../models/article'), 
    {User} = require('../models/user'), 
    {Comment} = require('../models/comment'), 
    {getDate} = require('./../public/js/getDate'),
    ObjectID = require('mongoose').Types.ObjectId;

exports.article = (req, res) => {
    Article.findOne({
        title: req.params.title
    }).then((mainArticle) => {
        return Article.find({
            author: mainArticle.author
        }).limit(3).then((authorArticle) => {
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
        res.json({
            "Error": "Wystąpił błąd podczas pobierania danych o artykule z bazy. Sprawdź konsole."
        })
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
//    replace(/\n/g, "<br />"),
    let newComment = Comment({
        username: req.session.user.username,
        body: req.body.tresc,
        title: req.params.title,
        category: req.params.category,
        date: getDate()
    }).save().then((result) => {
        res.redirect(`/news/${result.category}/${result.title}#${ObjectID(`${result._id}`)}`); //to news page
    }).catch((err) => {
        console.log(err.message);
        res.json({
            "Error":"Wystąpił błąd podczas próby dodania komentarza. Sprawdź konsole."
        })
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
        desc: req.body.shortbody,
        body: req.body.body,
        date: getDate(),
        isMain: (req.body.main || false),
        img: '/assets/img/news/default.jpg'
    }).save().then(() => {
        res.redirect('back');
    }).catch((err) => {
        console.log(err.message);
        res.json({
            "Error":"Wystąpił błąd podczas próby dodania artykułu. Sprawdź konsole."
        })
    })
}