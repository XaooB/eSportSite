const { Article } = require("../models/article"),
  { User } = require("../models/user"),
  { Comment } = require("../models/comment"),
  ObjectID = require("mongoose").Types.ObjectId,
  getDate = require("../helpers/getDate"),
  request = require("request-promise");

//NOWE

exports.articles = (req, res) => {
  res.render("articles", {
    title: "lista artykułów",
    currentServerTime: getDate()
  });
};

exports.searchGet = (req, res) => {
  const key = req.query.q;

  res.render("search", {
    title: "Wyszukiwarka",
    results: key,
    currentServerTime: getDate()
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
                session: req.session.user,
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
  let response = req.body["g-recaptcha-response"];
  if (
    response.length === 0 ||
    response === null ||
    response === undefined ||
    response === ""
  ) {
    res.send({
      error: "Błąd podczas walidacji. Spróbuj ponownie!"
    });
    return false;
  }

  let secretKey = "6Le9ai0UAAAAAFHPB7SrAhUW2TpwRKsfO7BbPYi_";
  let verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${response}`;

  request(verificationUrl).then(data => {
    data = JSON.parse(data);

    if (data.success !== undefined && !data.success) {
      res.send({
        error: "Błąd podczas walidacji. Spróbuj ponownie!"
      });
    }

    let addedAt = new Date();
    let newComment = Comment({
      username: req.body.username,
      body: req.body.body,
      title: req.params.title,
      date: addedAt
    })
      .save()
      .then(result => {
        res.redirect(
          `/news/${result.category}/${result.title}#${ObjectID(
            `${result._id}`
          )}`
        ); //to news page
      })
      .catch(err => {
        console.log(err.message);
        res.json({
          Error:
            "Wystąpił błąd podczas próby dodania komentarza. Sprawdź konsole."
        });
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
