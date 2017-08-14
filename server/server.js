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
    {mongoose} = require('./../database/mongoose'),
    {Article} = require('./../models/article');

app.engine('handlebars', hbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars'); //ustawiamy silnik szablonow na handlebars
app.use('/assets', express.static('public')); //sciezka do plikow statycznych


//GETS
app.get('/', (req, res) => {
    Article.find({}).then((data) => {
        res.render('home', {
            mainNews: {
                img: data[2].img,
                title: data[2].title,
                date: data[2].date
            },
            mid_news: {
                first: {
                    title: 'LOL: Mistrzostwa Świata 2017!'
                },
                second: {
                    title: 'TEC-9 dostaje nerfa!'
                },
                third: {
                    title: 'Kiedy kolejna operacja? Czekamy Valve!'
                }
            },
            small_news: {
                first: {
                    title: 'VIRTUS.PRO TAKE DOWN FNATIC IN KRAKÓW',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam nemo unde placeat numquam mollitia enim eveniet, maiores consequatur dolore rem.',
                    img: '../assets/img/news/taz.jpg'
                }
            },
            lastest_news: {
                title: 'SKT T1 WYGRYWA MSI 2017!',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam nemo unde placeat numquam mollitia enim eveniet, maiores consequatur dolore rem.',
                date: '02/08/2017, 20:29',
                img: '../assets/img/news/lol_championships.jpg'
            }
        });
    });
});

app.get('/news/:category/:title', (req, res) => {
    let promises = [
        mainArticle = Article.findOne({
            title: req.params.title
        }),
        newestArticles = Article.find({}).sort([['date', -1]])
        ];

    Promise.all([mainArticle, newestArticles]).then(articles => {
        res.render('news', {
            mainNews_author: articles[0].author,
            mainNews_category: articles[0].category,
            mainNews_title: articles[0].title,
            mainNews_body: articles[0].body,
            mainNews_img: articles[0].img,
            mainNews_date: articles[0].date,
            newestArticles: {
                article0: {
                    author: articles[1][0].author,
                    title: articles[1][0].title,
                    category: articles[1][0].category,
                    body: articles[1][0].body,
                    img: articles[1][0].img,
                    date: articles[1][0].date
                },
                article1: {
                    author: articles[1][1].author,
                    title: articles[1][1].title,
                    category: articles[1][1].category,
                    body: articles[1][1].body,
                    img: articles[1][1].img,
                    date: articles[1][1].date
                },
                article2: {
                    author: articles[1][2].author,
                    title: articles[1][2].title,
                    category: articles[1][2].category,
                    body: articles[1][2].body,
                    img: articles[1][2].img,
                    date: articles[1][2].date
                },
                article3: {
                    author: articles[1][3].author,
                    title: articles[1][3].title,
                    category: articles[1][3].category,
                    body: articles[1][3].body,
                    img: articles[1][3].img,
                    date: articles[1][3].date
                }
            }
        });
    }).catch((err) => {
        console.log(err.message);
        res.status(404).redirect('/error').send();
    })
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
