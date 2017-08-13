////   TO BĘDZIE W MOMENCIE DODAWANIA ARTYKUŁU! 
//
//var newArticle = new Article({
//        id: 2,
//        title: 'Jankos i H2K awansuje bezpośrednio do playoffów!',
//        author: 'XaooBBX',
//        body: '<p><strong>Drużyna H2K w której gra polski gracz Marcin "Jankos" Jankowski nie będzie musiała grać meczu z UOL, który miał zadecydować kto zagra w ćwierćfinale. Wszystko za sprawą drużyny Vitality, w której gra były gracz H2K oraz bardzo dobrze nam znany Vander. Vitality zaskoczyło większość i zagrało perfekcyjny mecz.</strong></p><p>Pierwszy mecz rozpoczęli z grubej rury. Szybki first blood Nukeducka bardzo ułatwił późniejszą fazę gry. Pierwszy mecz to pokaż siły i umiejętności jakie posiada Team Vitality. Gdyby drużynie Vandera udałoby się zagrać tak całego splita, to bez wątpienia byliby pretendentami do TOP3 na koniec rozgrywek.</p><p>Drugi mecz był nieco trudniejszy i wydawało się, że może pójść w obie strony. Ostatecznie to Vitality odniosły bardzo przekonujące zwycięstwo na UOL. Dzięki temu H2K nie będzie musiało grać meczu o awans. Ciekawostą jest celebrowanie zwycięstwa Jankosa wraz z drużyną Vitality po meczu. Widać stara miłość nie rdzewieje i dwaj polacy nadal wydają się jak bracia. Życzymy dalszych sukcesów!</p>',
//        img: '/assets/img/news/h2k.jpg'
//    }).save((err) => {
//        if (err) console.log(err.message);
//        console.log('Saved in database');
//    });



const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;
const {
    mongoose
} = require('./../database/mongoose');
const {
    Article
} = require('./../models/article');

app.engine('handlebars', hbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars'); //ustawiamy silnik szablonow na handlebars
app.use('/assets', express.static('public')); //sciezka do plikow statycznych


//GETS
app.get('/', (req, res) => {
    Article.find({}).then((data) => {
//        data[0] <- JANKOS
//        data[1] <- VP
        res.render('home', {
            mainNews: {
                img: data[0].img,
                title: data[0].title,
                date: data[0].date
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
    Article.findOne({
        'title': `${req.params.title}`
    }).then((data) => {
        res.render('news', {
            mainNews_author: data.author,
            mainNews_category: data.category,
            mainNews_title: data.title,
            mainNews_body: data.body,
            mainNews_img: data.img,
            mainNews_date: data.date
        })
    }, (err) => {
        console.log(err.message);
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

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Skontaktuj się z nami'
    })
});

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

app.listen(port, () => {
    console.log('Server running on localhost:3000');
});
