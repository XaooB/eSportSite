const {
    User
} = require('../models/user'),
    bcrypt = require('bcrypt'),
    session =  require('express-session');

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
                return res.redirect('/');
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

exports.profil = (req, res) => {
    res.render('profil', {
        title: 'Profil'
    })
}
