const express = require('express'),
    hbs = require('express-handlebars'),
    app = express(),
    router = express.Router(),
    PORT = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    recaptcha = require('recaptcha2'),
    request = require('request-promise'),
      
    //DATABASE AND MODELS
    {mongoose} = require('../database/mongoose'),
    {Article} = require('../models/article'),
    {Author} = require('../models/author'),
    {User} = require('../models/user'),
      
    //ROUTERS
    articleRouter = require('../routes/articleroutes'),
    homeRouter = require('../routes/homeroutes'),
    registerRouter = require('../routes/registerroutes'),
    loginRouter = require('../routes/loginroutes'),
    lolRouter = require('../routes/lolroutes'),
    csgoRouter = require('../routes/csgoroutes');


app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


//HOME ROUTER
router.get('/', homeRouter.articles);

//ARTICLE ROUTERS
router.get('/news/:category/:title', articleRouter.article);
router.get('/news', articleRouter.more);

//REGISTER ROUTERS
router.get('/register', registerRouter.registerGet);
router.post('/register', registerRouter.registerPost);

//LOGIN ROUTERS
router.get('/login/lost_password', loginRouter.lostGet);
router.get('/login', loginRouter.loginGet);
router.post('/login', loginRouter.loginPost);

//LOL ROUTERS
router.get('/lol/events', lolRouter.events);
router.get('/lol/matches', lolRouter.matches);
router.get('/lol/teams', lolRouter.teams);
router.get('/lol/results', lolRouter.results);
router.get('/lol/statistics', lolRouter.statistics);
router.get('/lol/ranking', lolRouter.ranking);

//CSGO ROUTERS
router.get('/csgo/events', csgoRouter.events);
router.get('/csgo/matches', csgoRouter.matches);
router.get('/csgo/teams', csgoRouter.teams);
router.get('/csgo/results', csgoRouter.results);
router.get('/csgo/statistics', csgoRouter.statistics);
router.get('/csgo/ranking', csgoRouter.ranking);

//HOME ROUTERS
app.get('/gallery', homeRouter.navGallery);
app.get('/contact', homeRouter.navContact);
app.get('/news/archives', homeRouter.navArchives);
app.get('/news/addArticle', (req, res) => {
    res.render('addArticle');
});

router.get('/error', (req, res) => {
    res.render('404', {
        title: 'Błąd 404. Taka strona nie istnieje!',
        desc: 'Coś poszło nie tak :(',
        fun: 'Strona w budowie.'
    });
});

app.post('/news/addArticle', (req, res) => {
    let title = req.body.title,
        category = req.body.category,
        author = req.body.author,
        body = req.body.body;

    Article.count({}).then((amount) => {
        let newArticle = new Article({
            id: amount + 1,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            body: req.body.body
        }).save().then((data) => {
            console.log(data);
        });
    }).catch((err) => {
        console.log(err.message);
    });
});

app.use('/', router);

//ERROR HANDLING
//app.use((req, res) => {
//    res.redirect('/error');
//});

//SERVER
app.listen(PORT, () => {
    console.log('Server running on localhost:3000');
});
