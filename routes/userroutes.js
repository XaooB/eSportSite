const {
    User
} = require('../models/user'), {
        Comment
    } = require('../models/comment'), {
        Article
    } = require('../models/article'),
    bcrypt = require('bcrypt'),
    session = require('express-session');

exports.loginGet = (req, res) => {
    if (req.user) {
        res.redirect('/')
    } else {
        res.render('login', {
            title: 'Logowanie'
        });
    }
};

exports.lostGet = (req, res) => {
    res.render('lostPassword', {
        title: 'Resetowanie hasła'
    });
};

exports.loginPost = (req, res) => {
    User.findOne({
        username: req.body.username.toLowerCase().trim()
    }).then((user) => {
        return bcrypt.compare(req.body.password, user.password).then((result) => {
            if (result) {
                req.session.user = user;
                return res.render('loggedIn', {
                    user: req.session.user
                });
            }
            throw new Error();
        }).catch((err) => {
            res.render('login', {
                Error: 'Hasło nieprawidłowe. Spróbuj ponownie!'
            })
        });
    }).catch((err) => {
        console.log('MONGOOSE ERROR: ' + err.message);
        res.render('login', {
            Error: `Niestety, ale użytkownik ${req.body.username} nie istnieje w naszej bazie! Proszę się zajerejstrować <a href='/register'>tutaj</a>!`
        })
    })
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}

exports.me = (req, res) => {
    User.findOne({
        username: req.user.username.toLowerCase()
    }).then((user) => {
        return Comment.find({
            username: user.username
        }).limit(5).then((comment) => {
            res.render('profil', {
                title: 'Profil',
                user: user,
                comment: comment
            });
        })
    }).catch((err) => {
        console.log(err);
        res.json({
            "Error": "Wystąpił błąd podczas wyszukiwania użytkownika w bazie. Sprawdź konsole."
        })
    });
}

exports.profil = (req, res) => {
    User.findOne({
        username: req.params.username.toLowerCase()
    }).then((user) => {
        return Comment.find({
            username: user.username
        }).limit(5).then((comment) => {
            if (req.session.user && (req.session.user.username === req.params.username)) {
                res.redirect('/profil/me')
            } else {
                res.render('profil_2', {
                    title: 'Profil',
                    username: user,
                    comment: comment
                });
            }
        })
    }).catch((err) => {
        console.log(err);
        res.json({
            "Error": "Takiego użytkownika nie ma w naszej bazie"
        })
    });
}

exports.dashboard = (req, res) => {
    let posts = Article.count({}),
        users = User.count({}),
        comments = Comment.count({}),
        lastposts = Article.find({}).limit(5).sort('-date'),
        lastusers = User.find({}).limit(5).sort('-createdAt'),
        lastcomments = Comment.find({}).limit(5).sort('-date');

    Promise.all([posts, users, comments, lastposts, lastusers, lastcomments]).then((result) => {
        res.render('admin_dashboard', {
            layout: 'adminPanel',
            postsCount: result[0],
            usersCount: result[1],
            commentsCount: result[2],
            lastposts: result[3],
            lastusers: result[4],
            lastcomments: result[5]
        });
    }).catch((err) => {
        console.log(err.message)
        res.json({
            "Error": "Wystąpił błąd w Promise.all. Sprawdź konsolę."
        })
    })
}

exports.articles = (req, res) => {
    let postCount = Article.count({}),
        posts = Article.find({}).sort('-date');

    Promise.all([postCount, posts]).then((result) => {
        res.render('admin_articles', {
            layout: 'adminPanel',
            postsCount: result[0],
            posts: result[1]
        });
    }).catch((err) => {
        console.log(err.message);
        res.json({
            "Error": "Wystąpił błąd w Promise.all. Sprawdź konsolę."
        })
    })
}

exports.users = (req, res) => {
    let usersCount = User.count({}),
        users = User.find({}).sort('rank');

    Promise.all([usersCount, users]).then((result) => {
        res.render('admin_users', {
            layout: 'adminPanel',
            usersCount: result[0],
            usersList: result[1]
        });
    })
}

exports.comments = (req, res) => {
    let commentsCount = Comment.count({}),
        comments = Comment.find({}).sort('-date');

    Promise.all([commentsCount, comments]).then((result) => {
        res.render('admin_comments', {
            layout: 'adminPanel',
            commentsCount: result[0],
            commentsList: result[1]
        });
    }).catch((err) => {
        console.log(err.message);
    })
}
