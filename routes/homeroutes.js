const { Article } = require("./../models/article"),
  getDate = require("../helpers/getDate");

exports.articles = (req, res) => {
  console.log("ip: ", req.ip);
  console.log("ips: ", req.ips);
  Article.findOne({
    isMain: true
  })
    .then(mainArticle => {
      return Article.find({})
        .where("isMain")
        .ne("on")
        .sort("-date")
        .limit(3)
        .then(asideArticles => {
          return Article.find({})
            .where("isMain")
            .ne("on")
            .sort("-date")
            .skip(3)
            .limit(6)
            .then(bigLatest => {
              return Article.find({})
                .where("isMain")
                .ne("on")
                .sort("-date")
                .skip(9)
                .limit(9)
                .then(latestArticles => {
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
    title: "Kontakt",
    currentServerTime: getDate()
  });
};
