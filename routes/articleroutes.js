const { Article } = require("../models/article"),
  { User } = require("../models/user"),
  { Comment } = require("../models/comment"),
  ObjectID = require("mongoose").Types.ObjectId,
  getDate = require("../helpers/getDate");

//NOWE

exports.articles = (req, res) => {
  res.render("articles", {
    title: "lista artykułów"
  });
};

exports.searchGet = (req, res) => {
  res.render("search", {
    title: "Wyszukiwarka",
    currentServerTime: getDate()
  });
};

exports.searchPost = (req, res) => {
  const key = req.body.key;
  res.render("search", {
    results: key
  });
};

//STARE

exports.article = (req, res) => {
  Article.findOne({
    title: req.params.title
  })
    .then(mainArticle => {
      return Article.find({})
        .where("title")
        .ne(req.params.title)
        .sort("-date")
        .then(newestArticles => {
          return Comment.find({
            title: mainArticle.title
          })
            .sort("-date")
            .then(comments => {
              res.render("single-article", {
                title: mainArticle.title,
                mainNews: mainArticle,
                lastestNews: newestArticles,
                comments: comments,
                currentServerTime: getDate()
              });
            });
        });
    })
    .catch(err => {
      res.send("Artykuł o takiej nazwie nie istnieje!");
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
