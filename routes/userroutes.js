const {
    User
} = require('../models/user'), {
    Comment
} = require('../models/comment')
bcrypt = require('bcrypt'),
    session = require('express-session');

exports.loginGet = (req, res) => {
    res.render('login', {
        title: 'Logowanie'
    });
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

exports.admin = (req, res) => {
    res.render('admin', {
        layout: 'adminPanel'
    });
}
