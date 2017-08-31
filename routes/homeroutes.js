const {Article} = require('./../models/article');

exports.articles = (req, res) => {
    Article.findOne({
        isMain: true
    }).then((mainArticle) => {
        console.log(mainArticle)
        return Article.find({}).where('isMain').ne('on').sort('-date').limit(3).then((moreArticles) => {
            return Article.find({
                category: 'lol'
            }).sort('-date').then((lastestLolArticles) => {
                return Article.find({
                    category: 'csgo'
                }).sort('-date').then((lastestCsgoArticles) => {
                    res.render('home', {
                        session: req.session.user,
                        title: 'Home',
                        mainNews: mainArticle,
                        moreArticles: moreArticles,
                        latestLolArticles: lastestLolArticles,
                        latestCsgoArticles: lastestCsgoArticles,
                    });
                });
            });
        });
    }).catch((err) => {
        console.log(err.message);
        res.json({
            "Error":"Wystąpił błąd podczas próby pobrania artykułów z bazy. Sprawdź konsole."
        })
    });
};

exports.navGallery = (req, res) => {
     console.log(req.session);
    res.render('gallery', {
        title: 'Galeria zdjęć'
    });
}
exports.navArchives = (req, res) => {
    res.render('archives', {
        title: 'Archiwum wiadomości'
    });
}
exports.navContact = (req, res) => {
    res.render('contact', {
        title: 'Skontaktuj się z nami'
    })
}
