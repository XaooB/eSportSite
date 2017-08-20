const {Article} = require('./../models/article');

exports.articles = (req, res) => {
    Article.findOne({
        isMain: true
    }).then((mainArticle) => {
        return Article.find({}).where('isMain').ne(true).sort('-date').limit(3).then((moreArticles) => {
            return Article.find({
                category: 'lol'
            }).sort('-date').then((lastestLolArticles) => {
                return Article.find({
                    category: 'csgo'
                }).sort('-date').then((lastestCsgoArticles) => {
                    res.render('home', {
                        mainNews: {
                            title: mainArticle.title,
                            category: mainArticle.category,
                            date: mainArticle.date,
                            img: mainArticle.img
                        },
                        moreArticles: {
                            article1: {
                                title: moreArticles[0].title,
                                category: moreArticles[0].category,
                                date: moreArticles[0].date
                            },
                            article2: {
                                title: moreArticles[1].title,
                                category: moreArticles[1].category,
                                date: moreArticles[1].date
                            },
                            article3: {
                                title: moreArticles[2].title,
                                category: moreArticles[2].category,
                                date: moreArticles[2].date
                            }
                        },
                        latestLolArticles: {
                            article1: {
                                title: lastestLolArticles[0].title,
                                date: lastestLolArticles[0].date,
                                category: lastestLolArticles[0].category,
                                body: lastestLolArticles[0].body.substr(11, 140) + '...',
                                img: lastestLolArticles[0].img
                            },
                            article2: {
                                title: lastestLolArticles[1].title,
                                date: lastestLolArticles[1].date,
                                category: lastestLolArticles[1].category,
                                body: lastestLolArticles[1].body.substr(11, 140) + '...',
                                img: lastestLolArticles[1].img
                            },
                            article3: {
                                title: lastestLolArticles[2].title,
                                date: lastestLolArticles[2].date,
                                category: lastestLolArticles[2].category,
                                body: lastestLolArticles[2].body.substr(11, 140) + '...',
                                img: lastestLolArticles[2].img
                            },
                            article4: {
                                title: lastestLolArticles[3].title,
                                date: lastestLolArticles[3].date,
                                category: lastestLolArticles[3].category,
                                body: lastestLolArticles[3].body.substr(11, 140) + '...',
                                img: lastestLolArticles[3].img
                            },
                            article5: {
                                title: lastestLolArticles[4].title,
                                date: lastestLolArticles[4].date,
                                category: lastestLolArticles[4].category,
                                body: lastestLolArticles[4].body.substr(11, 140) + '...',
                                img: lastestLolArticles[4].img
                            }
                        },
                        latestCsgoArticles: {
                            article1: {
                                title: lastestCsgoArticles[0].title,
                                date: lastestCsgoArticles[0].date,
                                category: lastestCsgoArticles[0].category,
                                body: lastestCsgoArticles[0].body.substr(11, 140) + '...',
                                img: lastestCsgoArticles[0].img
                            },
                            article2: {
                                title: lastestCsgoArticles[1].title,
                                date: lastestCsgoArticles[1].date,
                                category: lastestCsgoArticles[1].category,
                                body: lastestCsgoArticles[1].body.substr(11, 140) + '...',
                                img: lastestCsgoArticles[1].img
                            },
                            article3: {
                                title: lastestCsgoArticles[2].title,
                                date: lastestCsgoArticles[2].date,
                                category: lastestCsgoArticles[2].category,
                                body: lastestCsgoArticles[2].body.substr(11, 140) + '...',
                                img: lastestCsgoArticles[2].img
                            },
                            article4: {
                                title: lastestCsgoArticles[3].title,
                                date: lastestCsgoArticles[3].date,
                                category: lastestCsgoArticles[3].category,
                                body: lastestCsgoArticles[3].body.substr(11, 140) + '...',
                                img: lastestCsgoArticles[3].img
                            },
                            article5: {
                                title: lastestCsgoArticles[4].title,
                                date: lastestCsgoArticles[4].date,
                                category: lastestCsgoArticles[4].category,
                                body: lastestCsgoArticles[4].body.substr(11, 140) + '...',
                                img: lastestCsgoArticles[4].img
                            }
                        }
                    });
                });
            });
        });
    }).catch((err) => {
        res.redirect('/error');
    });
};

exports.navGallery = (req, res) => {
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