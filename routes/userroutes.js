const { User } = require("../models/user"),
  { Comment } = require("../models/comment"),
  { Article } = require("../models/article"),
  bcrypt = require("bcrypt"),
  session = require("express-session");

exports.loginGet = (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", { title: "Logowanie" });
  }
};

exports.lostPassword = (req, res) => {
  res.render("404");
};

exports.loginPost = (req, res) => {
  //prawdopodobnie nie działa bcypr (używa werjsa to 1.>)
  // User.findOne({ username: req.body.username.toLowerCase().trim() })
  //   .then(user => {
  //     return bcrypt
  //       .compare(req.body.password, user.password)
  //       .then(result => {
  //         if (result) {
  //           req.session.user = user;
  //           return res.render("loggedIn", { user: req.session.user });
  //         }
  //         throw new Error();
  //       })
  //       .catch(err => {
  //         res.render("login", {
  //           Error: "Hasło nieprawidłowe. Spróbuj ponownie!"
  //         });
  //       });
  //   })
  //   .catch(err => {
  //     console.log("MONGOOSE ERROR: " + err.message);
  //     res.render("login", {
  //       Error: `Niestety, ale użytkownik ${
  //         req.body.username
  //       } nie istnieje w naszej bazie! Proszę się zarejestrować <a href='/register'>tutaj</a>!`
  //     });
  //   });

  res.render("404");
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

exports.dashboard = (req, res) => {
  res.render("admin-dashboard", {
    layout: "adminPanel",
    title: "Dashboard"
  });
  // let posts = Article.count({}),
  //   users = User.count({}),
  //   comments = Comment.count({}),
  //   lastposts = Article.find({})
  //     .limit(5)
  //     .sort("-date"),
  //   lastusers = User.find({})
  //     .limit(5)
  //     .sort("-createdAt"),
  //   lastcomments = Comment.find({})
  //     .limit(5)
  //     .sort("-date");

  // Promise.all([posts, users, comments, lastposts, lastusers, lastcomments])
  //   .then(result => {
  //     res.render("admin_dashboard", {
  //       layout: "adminPanel",
  //       postsCount: result[0],
  //       usersCount: result[1],
  //       commentsCount: result[2],
  //       lastposts: result[3],
  //       lastusers: result[4],
  //       lastcomments: result[5]
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err.message);
  //     res.json({ Error: "Wystąpił błąd w Promise.all. Sprawdź konsolę." });
  //   });
};

exports.articles = (req, res) => {
  let postCount = Article.count({}),
    posts = Article.find({}).sort("-date");

  Promise.all([postCount, posts])
    .then(result => {
      res.render("admin_articles", {
        layout: "adminPanel",
        title: "Artykuły",
        postsCount: result[0],
        posts: result[1]
      });
    })
    .catch(err => {
      console.log(err.message);
      res.json({ Error: "Wystąpił błąd w Promise.all. Sprawdź konsolę." });
    });
};

exports.users = (req, res) => {
  let usersCount = User.count({}),
    users = User.find({}).sort("rank");

  Promise.all([usersCount, users]).then(result => {
    res.render("admin_users", {
      layout: "adminPanel",
      title: "Użytkownicy",
      usersCount: result[0],
      usersList: result[1]
    });
  });
};

exports.comments = (req, res) => {
  let commentsCount = Comment.count({}),
    comments = Comment.find({}).sort("-date"),
    unverifiedCount = Comment.find({ verified: false })
      .where("verified")
      .equals("false")
      .count({}),
    verifiedCount = Comment.find({ verified: false })
      .where("verified")
      .equals("true")
      .count({});

  Promise.all([commentsCount, comments, unverifiedCount, verifiedCount])
    .then(result => {
      res.render("admin_comments", {
        layout: "adminPanel",
        title: "Komentarze",
        commentsCount: result[0],
        commentsList: result[1],
        unverfiedCount: result[2],
        verifiedCount: result[3]
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};
