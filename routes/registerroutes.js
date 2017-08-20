const request = require('request-promise');

exports.registerPost = (req, res) => {
    let hash = (password) => {
        bcrypt.genSalt(10).then((salt) => {
            return bcrypt.hash(password, salt).then((hash) => {
                return hash;
            });
        }).catch((err) => {
            console.log("Błąd podczas generowania salta: " + err.message);
        });
    }

    let response = req.body['g-recaptcha-response'],
        username = req.body.nickname,
        email = req.body.email;

    if (response.length === 0 || response === null || response === undefined || response === '') {
        res.render('register', {
            Error: 'Udownodnij, że nie jesteś BOT-em!'
        })
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
            nickname: req.body.nickname,
            email: req.body.email,
            password: hash(req.body.password),
            rank: 'user'
        }).save().then(() => {
            console.log('User saved in database!')
            res.render('registered', {
                title: 'Rejestracja zakończona',
                username: nickname,
                email: email
            });
        });
    }).catch((err) => {
        res.render('registered', {
            Error: err.message
        });
    });
};

exports.registerGet = (req, res) => {
    res.render('register', {
        title: 'Rejestracja'
    });
}
