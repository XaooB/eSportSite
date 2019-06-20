const { Article } = require("./../models/article"),
  getDate = require("../helpers/getDate");

exports.articles = (req, res) => {
  Article.findOne({
    isMain: true
  })
    .then(mainArticle => {
      return Article.find({})
        .where("isMain")
        .ne("on")
        .sort("-date")
        .then(latestArticles => {
          //tmp
          let counter = 0;
          const asideArticles = latestArticles.filter(item => {
            while (counter < 3) {
              counter++;
              return item;
            }
          });
          counter = 0;
          const bigLatest = latestArticles.filter(item => {
            while (counter < 6) {
              counter++;
              return item;
            }
          });

          res.render("home", {
            session: req.session.user,
            title: "Strona główna",
            mainArticle: mainArticle,
            moreArticles: asideArticles,
            latestArticles: latestArticles,
            bigLatestArticles: bigLatest,
            currentServerTime: getDate()
          });
        });
    })
    .catch(err => {
      console.log(err.message);
      res.json({
        Error:
          "Wystąpił błąd podczas próby pobrania artykułów z bazy. Sprawdź konsole."
      });
    });
};

exports.contact = (req, res) => {
  res.render("contact", {
    currentServerTime: getDate()
  });
};
