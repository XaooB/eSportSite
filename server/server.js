const express = require("express"),
  hbs = require("express-handlebars"),
  app = express(),
  router = express.Router(),
  PORT = process.env.PORT || 3000,
  bodyParser = require("body-parser"),
  session = require("express-session"),
  MongoStore = require("connect-mongo")(session),
  //DATABASE AND MODELS
  mongoose = require("../database/mongoose"),
  { User } = require("../models/user"),
  //ROUTERS
  articleRouter = require("../routes/articleroutes"),
  homeRouter = require("../routes/homeroutes"),
  registerRouter = require("../routes/registerroutes"),
  userRouter = require("../routes/userroutes"),
  lolRouter = require("../routes/lolroutes"),
  csgoRouter = require("../routes/csgoroutes"),
  adminRouter = require("../routes/adminroutes");

app.engine(
  "handlebars",
  hbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.use("/assets", express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "as54v88vrh7e5a9",
    store: new MongoStore({
      mongooseConnection: mongoose.mongoose.connections[0],
      ttl: 1 * 60 * 60
    }),
    cookie: {
      path: "/",
      maxAge: 3600000 //10 min
    },
    secure: true,
    httpOnly: true,
    resave: false,
    saveUninitialized: true,
    name: "ID"
  })
);

function requireLogin(req, res, next) {
  if (!req.user) {
    res.redirect("/login");
  } else {
    next();
  }
}
function requireAdmin(req, res, next) {
  if (!req.user) {
    res.json({
      Error: "Musisz się zalogować, aby mieć dostęp."
    });
  } else {
    if (req.user.rank !== "admin") {
      res.json({
        Error: "Nie masz wymaganych uprawnień!"
      });
    } else {
      next();
    }
  }
}
function requireMod(req, res, next) {
  if (!req.user) {
    req.session.canBan = false;
    next();
  } else {
    if (req.user.rank === "admin" || req.user.rank === "moderator") {
      req.session.canBan = true;
      next();
    } else {
      next();
    }
  }
}
function requireRedaktor(req, res, next) {
  if (!req.user) {
    res.json({
      Error: "Proszę się zalogować."
    });
  } else {
    if (req.user.rank === "admin" || req.user.rank === "redaktor") {
      next();
    } else {
      res.json({
        Error: "Nie masz uprawnień do przeglądania tej strony"
      });
    }
  }
}

//SESSION
app.use((req, res, next) => {
  if (req.session && req.session.user) {
    User.findOne({
      username: req.session.user.username
    })
      .then(user => {
        req.user = user;
        delete req.user.password;
        req.session.user = user;
        res.locals.user = user;
        next();
      })
      .catch(err => {
        console.log(err.message);
      });
  } else {
    next();
  }
});

//HOME ROUTER
router.get("/", homeRouter.articles);

//ARTICLE ROUTERS
app.get("/admin", (req, res) => {
  res.redirect("/admin/dashboard"); //redirect to admin panel
});
router.get("/news/:category/:title", requireMod, articleRouter.article);
router.get("/news/:category", articleRouter.more);
router.post("/news/:category/:title", articleRouter.addComment);
router.get("/news", articleRouter.all);

//USER ROUTERS
router.get("/register", registerRouter.registerGet);
router.post("/register", registerRouter.registerPost);
router.get("/profil/me", requireLogin, userRouter.me);
router.get("/profil/:username", userRouter.profil);
router.get("/login/lost_password", userRouter.lostGet);
router.get("/login", userRouter.loginGet);
router.post("/login", userRouter.loginPost);
router.get("/logout", userRouter.logout);

//LOL ROUTERS
router.get("/lol/events", lolRouter.events);
router.get("/lol/matches", lolRouter.matches);
router.get("/lol/teams", lolRouter.teams);
router.get("/lol/results", lolRouter.results);
router.get("/lol/statistics", lolRouter.statistics);
router.get("/lol/ranking", lolRouter.ranking);

//CSGO ROUTERS
router.get("/csgo/events", csgoRouter.events);
router.get("/csgo/matches", csgoRouter.matches);
router.get("/csgo/teams", csgoRouter.teams);
router.get("/csgo/results", csgoRouter.results);
router.get("/csgo/statistics", csgoRouter.statistics);
router.get("/csgo/ranking", csgoRouter.ranking);

//HOME ROUTERS
app.get("/gallery", homeRouter.navGallery);
app.get("/contact", homeRouter.navContact);
app.get("/news/archives", homeRouter.navArchives);

//ADMIN ROUTERS
router.get("/admin/dashboard", requireAdmin, userRouter.dashboard);
router.get("/admin/articles", requireAdmin, userRouter.articles);
router.get("/admin/users", requireAdmin, userRouter.users);
router.get("/admin/comments", requireAdmin, userRouter.comments);
router.get("/admin/articles/add-article", requireAdmin, articleRouter.addNew);
router.post(
  "/admin/articles/add-article",
  requireAdmin,
  articleRouter.postArticle
);
router.get(
  "/admin/articles/edit-article",
  requireAdmin,
  articleRouter.editArticle
);
router.post(
  "/admin/articles/edit-article",
  requireAdmin,
  articleRouter.postEditArticle
);
router.get("/admin/comments/delete", requireAdmin, adminRouter.deleteComment);
router.get("/admin/comments/ban", requireAdmin, adminRouter.banUser);
router.get("/admin/articles/delete", requireAdmin, adminRouter.deleteArticle);
router.get("/admin/users/delete", requireAdmin, adminRouter.deleteUser);
router.get("/admin/users/ban", requireAdmin, adminRouter.banUser);
router.get("/admin/users/unban", requireAdmin, adminRouter.unBanUser);
router.get("/admin/users/give_role", requireAdmin, adminRouter.newRole);
router.get("/admin/article/edit", requireRedaktor, adminRouter.banUser);
router.get("/news/:category/:title/ban", requireMod, adminRouter.banUser);

//ROUTER
app.use("/", router);

//ERROR HANDLING
app.use((req, res) => {
  res.render("404", {
    title: "Błąd 404. Taka strona nie istnieje!",
    desc: "Coś poszło nie tak :(",
    fun: "Strona w budowie."
  });
});

//SERVER
app.listen(PORT, () => {
  console.log("Server running on localhost:3000");
});
