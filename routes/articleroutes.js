const { Article } = require("../models/article"),
  { User } = require("../models/user"),
  { Comment } = require("../models/comment"),
  { getDate } = require("./../public/js/getDate"),
  ObjectID = require("mongoose").Types.ObjectId,
  moment = require("moment");

exports.article = (req, res) => {
  Article.findOne({
    title: req.params.title
  })
    .then(mainArticle => {
      return Article.find({
        author: mainArticle.author
      })
        .limit(3)
        .then(authorArticle => {
          return Article.find({})
            .where("title")
            .ne(req.params.title)
            .sort("-date")
            .then(newestArticles => {
              return User.findOne({
                username: mainArticle.author
              }).then(authorData => {
                return Comment.find({
                  title: mainArticle.title
                })
                  .sort("-date")
                  .then(comments => {
                    // wrzucic do helpera
                    const currentDate = new Date();
                    const daysArr = [
                      "Poniedziałek",
                      "Wtorek",
                      "Środa",
                      "Czwartek",
                      "Piątek",
                      "Sobota",
                      "Niedziela"
                    ];
                    res.render("news", {
                      title: mainArticle.title,
                      mainNews: mainArticle,
                      lastestNews: newestArticles,
                      authorArticle: authorArticle,
                      author: authorData,
                      comments: comments,
                      canBan: req.session.canBan,
                      currentServerTime:
                        daysArr[currentDate.getDay() - 1] +
                        ", " +
                        currentDate.toLocaleDateString()
                    });
                  });
              });
            });
        });
    })
    .catch(err => {
      console.log(err);
      res.json({
        Error:
          "Wystąpił błąd podczas pobierania danych o artykule z bazy. Sprawdź konsole."
      });
    });
};

exports.all = (req, res) => {
  res.render("archives", {
    title: "Wiadomości"
  });
};

exports.addComment = (req, res) => {
  let newComment = Comment({
    username: req.session.user.username,
    body: req.body.tresc,
    title: req.params.title,
    category: req.params.category
  })
    .save()
    .then(result => {
      res.redirect(
        `/news/${result.category}/${result.title}#${ObjectID(`${result._id}`)}`
      ); //to news page
    })
    .catch(err => {
      console.log(err.message);
      res.json({
        Error:
          "Wystąpił błąd podczas próby dodania komentarza. Sprawdź konsole."
      });
    });
};

exports.addNew = (req, res) => {
  res.render("admin_newPost", {
    layout: "adminPanel"
  });
};

exports.postArticle = (req, res) => {
  let newArticle = new Article({
    title: req.body.title,
    category: req.body.category,
    author: req.user.username,
    desc: req.body.shortbody,
    body: req.body.body,
    date: getDate(),
    isMain: req.body.main || false,
    img: "/assets/img/news/default.jpg"
  })
    .save()
    .then(() => {
      res.redirect("back");
    })
    .catch(err => {
      console.log(err.message);
      res.json({
        Error: "Wystąpił błąd podczas próby dodania artykułu. Sprawdź konsole."
      });
    });
};

exports.editArticle = (req, res) => {
  Article.findOne({ _id: req.query.ID })
    .then(result => {
      res.render("admin_editPost", {
        layout: "adminPanel",
        id: req.query.ID,
        article: result
      });
    })
    .catch(err => {
      console.log(err.message);
      res.render("404");
    });
};

exports.postEditArticle = (req, res) => {
  Article.update(
    { _id: req.query.ID },
    {
      title: req.body.title,
      desc: req.body.shortbody,
      body: req.body.body
    }
  )
    .then(result => {
      console.log("Post został zaktualizowany.");
      res.redirect("/admin/articles");
    })
    .catch(err => {
      console.log(err.message);
      res.render("404");
    });
};

//NOWE

exports.articles = (req, res) => {
  res.render("articles", {
    title: "lista artykułów"
  });
};
