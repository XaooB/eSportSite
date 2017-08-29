const express = require('express'),
    hbs = require('express-handlebars'),
    app = express(),
    router = express.Router(),
    PORT = process.env.PORT || 3000,
    bodyParser = require('body-parser'),

    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),

    //DATABASE AND MODELS
    mongoose = require('../database/mongoose'),
    {
        User
    } = require('../models/user'),

    //ROUTERS
    articleRouter = require('../routes/articleroutes'),
    homeRouter = require('../routes/homeroutes'),
    registerRouter = require('../routes/registerroutes'),
    userRouter = require('../routes/userroutes'),
    lolRouter = require('../routes/lolroutes'),
    csgoRouter = require('../routes/csgoroutes');

app.engine('handlebars', hbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'as54v88vrh7e5a9',
    store: new MongoStore({
        mongooseConnection: mongoose.mongoose.connections[0],
        ttl: (1 * 60 * 60)
    }),
    cookie: {
        path: '/',
        maxAge: 3600000 //10 min
    },
    secure: true,
    httpOnly: true,
    resave: false,
    saveUninitialized: true,
    name: "ID"
}));

function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect('/login')
    } else {
        next();
    }
}

function requireAdmin(req, res, next) {
    if (!req.user) {
        res.json({
            "Error": "Musisz się zalogować, aby mieć dostęp."
        })
    } else {
        if (req.user.rank !== 'admin') {
            res.json({
                "Error": "Nie masz wymaganych uprawnień!"
            })
        } else {
            next();
        }
    }
}

app.use((req, res, next) => {
    if (req.session && req.session.user) {
        User.findOne({
                username: req.session.user.username
            })
            .then((user) => {
                req.user = user;
                delete req.user.password;
                req.session.user = user;
                res.locals.user = user;
                next();
            }).catch((err) => {
                console.log(err.message);
            })
    } else {
        next();
    }
});

//HOME ROUTER
router.get('/', homeRouter.articles);

//ARTICLE ROUTERS
router.get('/news/:category/:title', articleRouter.article);
router.get('/news/:category', articleRouter.more);
router.get('/admin/articles/add-article', requireAdmin, articleRouter.addNew);
router.post('/admin/articles/add-article', requireAdmin, articleRouter.postArticle);
router.post('/news/:categrory/:title?', articleRouter.addComment)
router.get('/news', articleRouter.all);

//USER ROUTERS
router.get('/register', registerRouter.registerGet);
router.post('/register', registerRouter.registerPost);
router.get('/profil/me', requireLogin, userRouter.me);
router.get('/profil/:username', userRouter.profil);
router.get('/login/lost_password', userRouter.lostGet);
router.get('/login', userRouter.loginGet);
router.post('/login', userRouter.loginPost);
router.get('/logout', userRouter.logout);
router.get('/admin/dashboard', requireAdmin, userRouter.dashboard);
router.get('/admin/articles', requireAdmin, userRouter.articles);
router.get('/admin/users', requireAdmin, userRouter.users);
router.get('/admin/comments', requireAdmin, userRouter.comments);

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
app.get('/news/addArticle', requireLogin, (req, res) => {
    console.log(req.session.user)
    res.render('addArticle');
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

//ROUTER
app.use('/', router);

//ERROR HANDLING
app.use((req, res) => {
    res.render('404', {
        title: 'Błąd 404. Taka strona nie istnieje!',
        desc: 'Coś poszło nie tak :(',
        fun: 'Strona w budowie.'
    });
});

//SERVER
app.listen(PORT, () => {
    console.log('Server running on localhost:3000');
});
