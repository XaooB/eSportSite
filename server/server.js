//  TO BĘDZIE W MOMENCIE DODAWANIA ARTYKUŁU! 
//    var newArticle = new Article({
//        id: 4,
//        title: 'SK Telecom T1 miażdży Afreeca Freecs w playoffach!',
//        category: 'lol',
//        author: 'Fan Fakera',
//        body: '<p><strong>Pierwsza mapa spotkania zaczęła się dość standardowym draftem. Afreeca Freecs zachowało ostatni wybór dla MaRina, który zdecydował się na Kennena. SK Telecom T1 z Untarą na górnej alei pokazało standardową kompozycję z silnymi teamfightami oraz pojedynczym carry w postaci Tristany.</strong></p><p>Sporym zaskoczeniem był nietypowy przedmiot kupiony na starcie przez Kramera. AD Carry zdecydował się na Relic Shield, który zazwyczaj budują wspierający. Nie przeszkodziło mu to jednak zabezpieczyć wraz z drużyną pierwszej krwi na dolnej alei. Bottom SKT zbyt agresywnie atakował przeciwników, przez co roam Spirita oraz Kuro okazał się zabójczy, a cenę zapłacił Wolf. Bang i jego wspólnik nadal radzili sobie świetnie i pomimo małej pomyłki dominowali swoją linię, zapewniając swojej drużynie sporą przewagę. Na górnej alei sprawy także szły po myśli SKT – świetny gank Peanuta pozwolił Untarze rozprawić się z przeciwnikiem.</p><p>oplaner mistrzów świata szybko pomógł także kolegom z zespołu i doskonałą teleportacją zgnębił jeszcze bardziej bottom Freecs. Ogromna przewaga SK Telecom T1 pozwoliła drużynie podejść na Barona Nashora już w 29. minucie, gdzie doskonały Smite Peanuta zapewnił zespołowi potężne wzmocnienie. Próba kradzieży ze strony Spirita skończyła się tylko śmiercią junglera i sprawiła, że skończenie gry, już kilka chwil później, było dla SKT bardzo łatwe.</p>',
//        img: '/assets/img/news/skt_t1_playoff.jpg'
//    }).save((err) => {
//        if (err) console.log(err.message);
//        console.log('Saved in database');
//    });
const express = require('express'),
    hbs = require('express-handlebars'),
    app = express(),
    PORT = process.env.PORT || 3000,
    {
        mongoose
    } = require('./../database/mongoose'),
    {
        Article
    } = require('./../models/article'),
    {
        Author
    } = require('./../models/author');

app.engine('handlebars', hbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars'); //ustawiamy silnik szablonow na handlebars
app.use('/assets', express.static('public')); //sciezka do plikow statycznych


//GETS
app.get('/', (req, res) => {
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
                                body: lastestLolArticles[0].body.substr(11,140) + '...',
                                img: lastestLolArticles[0].img
                            },
                            article2: {
                                title: lastestLolArticles[1].title,
                                date: lastestLolArticles[1].date,
                                category: lastestLolArticles[1].category,
                                body: lastestLolArticles[1].body.substr(11,140) + '...',
                                img: lastestLolArticles[1].img
                            },
                            article3: {
                                title: lastestLolArticles[2].title,
                                date: lastestLolArticles[2].date,
                                category: lastestLolArticles[2].category,
                                body: lastestLolArticles[2].body.substr(11,140) + '...',
                                img: lastestLolArticles[2].img
                            },
                            article4: {
                                title: lastestLolArticles[3].title,
                                date: lastestLolArticles[3].date,
                                category: lastestLolArticles[3].category,
                                body: lastestLolArticles[3].body.substr(11,140) + '...',
                                img: lastestLolArticles[3].img
                            },
                            article5: {
                                title: lastestLolArticles[4].title,
                                date: lastestLolArticles[4].date,
                                category: lastestLolArticles[4].category,
                                body: lastestLolArticles[4].body.substr(11,140) + '...',
                                img: lastestLolArticles[4].img
                            }
                        },
                        latestCsgoArticles: {
                            article1: {
                                title: lastestCsgoArticles[0].title,
                                date: lastestCsgoArticles[0].date,
                                category: lastestCsgoArticles[0].category,
                                body: lastestCsgoArticles[0].body.substr(11,140) + '...',
                                img: lastestCsgoArticles[0].img
                            },
                            article2: {
                                title: lastestCsgoArticles[1].title,
                                date: lastestCsgoArticles[1].date,
                                category: lastestCsgoArticles[1].category,
                                body: lastestCsgoArticles[1].body.substr(11,140) + '...',
                                img: lastestCsgoArticles[1].img
                            },
                            article3: {
                                title: lastestCsgoArticles[2].title,
                                date: lastestCsgoArticles[2].date,
                                category: lastestCsgoArticles[2].category,
                                body: lastestCsgoArticles[2].body.substr(11,140) + '...',
                                img: lastestCsgoArticles[2].img
                            },
                            article4: {
                                title: lastestCsgoArticles[3].title,
                                date: lastestCsgoArticles[3].date,
                                category: lastestCsgoArticles[3].category,
                                body: lastestCsgoArticles[3].body.substr(11,140) + '...',
                                img: lastestCsgoArticles[3].img
                            },
                            article5: {
                                title: lastestCsgoArticles[4].title,
                                date: lastestCsgoArticles[4].date,
                                category: lastestCsgoArticles[4].category,
                                body: lastestCsgoArticles[4].body.substr(11,140) + '...',
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
});

app.get('/news/:category/:title', (req, res) => {
    Article.findOne({
        title: req.params.title
    }).then((mainArticle) => {
        return Article.find({
            author: mainArticle.author
        }).where('title').ne(req.params.title).then((authorArticle) => {
            return Article.find({}).where('title').ne(req.params.title).sort('-date').then((newestArticles) => {
                return Author.findOne({
                    nickname: mainArticle.author
                }).then((authorData) => {
                    res.render('news', {
                        mainNews: {
                            title: mainArticle.title,
                            author: mainArticle.author,
                            category: mainArticle.category,
                            body: mainArticle.body,
                            img: mainArticle.img,
                            date: mainArticle.date
                        },
                        lastestNews: {
                            article1: {
                                title: newestArticles[0].title,
                                author: newestArticles[0].author,
                                category: newestArticles[0].category,
                                body: newestArticles[0].body,
                                img: newestArticles[0].img,
                                date: newestArticles[0].date
                            },
                            article2: {
                                title: newestArticles[1].title,
                                author: newestArticles[1].author,
                                category: newestArticles[1].category,
                                body: newestArticles[1].body,
                                img: newestArticles[1].img,
                                date: newestArticles[1].date
                            },
                            article3: {
                                title: newestArticles[2].title,
                                author: newestArticles[2].author,
                                category: newestArticles[2].category,
                                body: newestArticles[2].body,
                                img: newestArticles[2].img,
                                date: newestArticles[2].date
                            },
                            article4: {
                                title: newestArticles[3].title,
                                author: newestArticles[3].author,
                                category: newestArticles[3].category,
                                body: newestArticles[3].body,
                                img: newestArticles[3].img,
                                date: newestArticles[3].date
                            },
                            article5: {
                                title: newestArticles[4].title,
                                author: newestArticles[4].author,
                                category: newestArticles[4].category,
                                body: newestArticles[4].body,
                                img: newestArticles[4].img,
                                date: newestArticles[4].date
                            },
                            article6: {
                                title: newestArticles[5].title,
                                author: newestArticles[5].author,
                                category: newestArticles[5].category,
                                body: newestArticles[5].body,
                                img: newestArticles[5].img,
                                date: newestArticles[5].date
                            },
                            article7: {
                                title: newestArticles[6].title,
                                author: newestArticles[6].author,
                                category: newestArticles[6].category,
                                body: newestArticles[6].body,
                                img: newestArticles[6].img,
                                date: newestArticles[6].date
                            },
                            article8: {
                                title: newestArticles[7].title,
                                author: newestArticles[7].author,
                                category: newestArticles[7].category,
                                body: newestArticles[7].body,
                                img: newestArticles[7].img,
                                date: newestArticles[7].date
                            },
                            article9: {
                                title: newestArticles[8].title,
                                author: newestArticles[8].author,
                                category: newestArticles[8].category,
                                body: newestArticles[8].body,
                                img: newestArticles[8].img,
                                date: newestArticles[8].date
                            }
                        },
                        authorArticle: {
                            article1: {
                                title: authorArticle[0].title,
                                category: authorArticle[0].category,
                                img: authorArticle[0].img
                            }
                        },
                        authorData: {
                            nickname: authorData.nickname,
                            rank: authorData.rank,
                            avatar: authorData.avatar,
                            info: authorData.info
                        }
                    });
                }).catch((err) => {
                    console.log(err);
                    res.redirect('/error').send();
                })
            }).catch((err) => {
                console.log(err);
                res.redirect('/error').send();
            })
        }).catch((err) => {
            console.log(err);
            res.redirect('/error').send();
        })
    }).catch((err) => {
        console.log(err);
        res.redirect('/error').send();
    });
});

app.get('/profil/register', (req, res) => {
    res.render('register', {
        title: 'Rejestracja'
    });
});

app.get('/lol/events', (req, res) => {
    res.render('events', {
        title: 'Wydarzenia: League of Legends'
    });
});

app.get('/csgo/events', (req, res) => {
    res.render('events', {
        title: 'Wydarzenia: Counter Strike: Global Offensive'
    });
});

app.get('/lol/matches', (req, res) => {
    res.render('matches', {
        title: 'Mecze: League of Legends'
    });
});

app.get('/csgo/matches', (req, res) => {
    res.render('matches', {
        title: 'Mecze: Counter Strike: Global Offensive'
    })
});

app.get('/lol/teams', (req, res) => {
    res.render('teams', {
        title: 'Mecze: League of Legends'
    })
});

app.get('/csgo/teams', (req, res) => {
    res.render('teams', {
        title: 'Drużyny: Counter Strike: Global Offensive'
    })
});

app.get('/lol/results', (req, res) => {
    res.render('results', {
        title: 'Wyniki: League of Legends'
    });
});

app.get('/csgo/results', (req, res) => {
    res.render('results', {
        title: 'Wyniki: Counter Strike: Global Offensive'
    });
});

app.get('/lol/statistics', (req, res) => {
    res.render('statistics', {
        title: 'Statystyki: League of Legends'
    });
});

app.get('/csgo/statistics', (req, res) => {
    res.render('statistics', {
        title: 'Statystyki: Counter Strike: Global Offensive'
    });
});


app.get('/lol/ranking', (req, res) => {
    res.render('ranking', {
        title: 'Ranking: League of Legends'
    });
});

app.get('/csgo/ranking', (req, res) => {
    res.render('ranking', {
        title: 'Ranking: Counter Strike: Global Offensive'
    });
});

app.get('/news/archives', (req, res) => {
    res.render('archives', {
        title: 'Archiwum wiadomości'
    });
});

app.get('/gallery', (req, res) => {
    res.render('gallery', {
        title: 'Galeria zdjęć'
    });
});

app.get('/news/addArticle', (req, res) => {
    res.render('addArticle');
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Skontaktuj się z nami'
    })
});

//------------------------------------------------------ TESTING PURPOSES!
app.get('/test', (req, res) => {
    var newAuthor = new Author({
        nickname: 'Typowy Dres',
        rank: 'Redaktor',
        avatar: '/assets/img/avatars/typowy_dres.jpg',
        info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium temporibus, quam quaerat fugiat, commodi provident. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, ab?'
    }).save((err) => {
        if (err) console.log(err.message);
        console.log('Saved in database');
    });
    res.render('test');
});
//------------------------------------------------------ /TESTING PURPOSES!

app.get('/error', (req, res) => {
    res.status(404).render('404', {
        title: 'Błąd 404. Taka strona nie istnieje!',
        desc: 'Coś poszło nie tak :(',
        fun: 'Strona w budowie.'
    });
});

//POSTS
app.post('/profil/register', (req, res) => {
    res.send('WYSŁAŁEM FORMULARZ');
});

//ERROR HANDLING
app.use((req, res) => {
    res.redirect('/error');
});

app.listen(PORT, () => {
    console.log('Server running on localhost:3000');
});
