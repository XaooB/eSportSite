const { Article } = require("../models/article"),
  { User } = require("../models/user"),
  { Comment } = require("../models/comment"),
  ObjectID = require("mongoose").Types.ObjectId,
  getDate = require("../helpers/getDate"),
  request = require("request-promise");

//NOWE

exports.articles = (req, res) => {
  Article.find({})
    .count()
    .then(count => {
      const articlesPerPage = 9;
      const maxPages = Math.ceil(count / articlesPerPage);
      const currentPage = Number(req.query.page) || 1;
      const nextPage = currentPage >= maxPages ? false : currentPage + 1;
      const previousPage = currentPage > 1 ? currentPage - 1 : false;
      const amountToSkip =
        currentPage > 1 ? (currentPage * articlesPerPage) / 2 : 0;

      return Article.find({})
        .skip(amountToSkip)
        .limit(articlesPerPage)
        .sort("-date")
        .then(articles => {
          res.render("articles", {
            title: "Artykuły",
            articles: articles,
            nextPage: nextPage,
            previousPage: previousPage,
            currentServerTime: getDate()
          });
        });
    });
};

exports.searchGet = (req, res) => {
  const key = req.query.q;

  if (key !== undefined) {
    Article.find({
      title: { $regex: key, $options: "i" }
    })
      .then(articles => {
        if (articles.length) {
          res.render("search", {
            title: "Wyszukiwarka",
            result: articles,
            currentServerTime: getDate()
          });
        } else {
          res.render("search", {
            title: "Wyszukiwarka",
            message: "Brak artykułów dla ponadej frazy.",
            currentServerTime: getDate()
          });
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  } else {
    res.render("search", {
      title: "Wyszukiwarka",
      currentServerTime: getDate()
    });
  }
};

//STARE

exports.article = (req, res) => {
  const title = req.params.title.replace(/-/g, " ");

  Article.findOne({
    title: { $regex: title, $options: "i" }
  })
    .then(mainArticle => {
      return Article.find({})
        .where("title")
        .ne(req.params.title)
        .limit(10)
        .sort()
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
      error: "Musisz udowodnić, że nie jesteś BOT-em!"
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

    let newComment = Comment({
      username: req.body.username,
      body: req.body.body,
      title: req.params.title,
      date: new Date()
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
    date: new Date(),
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
