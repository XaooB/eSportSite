const {User} = require('../models/user'),
      bcrypt = require('bcrypt');

exports.loginGet = (req, res) => {
    res.render('login', {
        title: 'Logowanie'
    });
};

exports.lostGet = (req, res) => {
    res.render('lostPassword', {
        title: 'Przypomnienie hasła'
    });
};

exports.loginPost = (req, res) => {
    User.findOne({username: req.body.username}).then((data) => {
        console.log('Użytkownik istnieje w bazie danych');
        return bcrypt.compare(req.body.password, data.password).then((result) => {
            if(result) {
                return res.json({
                    "Success": 'Success.'
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