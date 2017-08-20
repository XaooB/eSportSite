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
