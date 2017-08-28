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
        username: req.body.username
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
        username: req.user.username
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
    });
}

exports.profil = (req, res) => {
    User.findOne({
        username: req.params.username
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
    });
}

exports.dashboard = (req, res) => {
    let posts = Article.count({}),
        users = User.count({}),
        comments = Comment.count({}),
        lastposts = Article.find({}).limit(5).sort('-date'),
        lastusers = User.find({}).limit(5).sort('-date'),
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
    })
}

exports.users = (req, res) => {
    res.render('admin_users', {
        layout: 'adminPanel'
    });
}

exports.comments = (req, res) => {
    res.render('admin_comments', {
        layout: 'adminPanel'
    });
}
