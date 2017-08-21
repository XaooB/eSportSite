const request = require('request-promise'),
    bcrypt = require('bcrypt'),
    {User} = require('../models/user');

exports.registerPost = (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hashedassword) => {
        let response = req.body['g-recaptcha-response'];

        if (response.length === 0 || response === null || response === undefined || response === '') {
            res.render('register', {
                Error: 'Udownodnij, że nie jesteś BOT-em!'
            });
            return false;
        }

        let secretKey = '6Le9ai0UAAAAAFHPB7SrAhUW2TpwRKsfO7BbPYi_';
        let verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${response}`;

        request(verificationUrl).then((data) => {
            data = JSON.parse(data);

            if (data.success !== undefined && !data.success) {
                res.render('register', {
                    Error: 'Błąd podczas walidacji. Spróbuj ponownie!'
                })
            };

            let newUser = User({
                username: req.body.username,
                email: req.body.email,
                password: hashedassword
            }).save().then((data) => {
                res.render('registered', {
                    title: 'Rejestracja zakończona',
                    username: data.username,
                    email: data.email
                });
            }).catch((err) => {
                console.log(err.message);
                res.render('register', {
                    title: 'Błąd',
                    Error: 'Niestety, ale taki użytkownik już istnieje w naszej bazie!'
                });
            })
        }).catch((err) => {
            console.log(err.message);
            res.render('register', {
                title: 'Błąd',
                Error: err.message
            });
        });
    }).catch((err) => {
        console.log(err.message);
        res.render('register', {
            title: 'Błąd',
            Error: err.message
        });
    })
};

exports.registerGet = (req, res) => {
    res.render('register', {
        title: 'Rejestracja - eSportSite'
    });
}
