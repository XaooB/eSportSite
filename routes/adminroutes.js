const { Comment } = require("../models/comment"),
  { User } = require("../models/user"),
  { Article } = require("../models/article");

exports.deleteComment = (req, res) => {
  Comment.find({
    _id: req.query.ID
  })
    .remove()
    .then(() => {
      console.log("Comment has been deleted!");
      res.redirect("back");
    })
    .catch(err => {
      console.log(err.mesage);
      res.json({
        Error:
          "Wystąpił błąd podczas próby usunięcia komentarza. Sprawdź konsolę."
      });
    });
};

exports.deleteArticle = (req, res) => {
  Article.find({
    _id: req.query.ID
  })
    .remove()
    .then(() => {
      console.log("Article has been deleted!");
      res.redirect("back");
    })
    .catch(err => {
      console.log(err.mesage);
      res.json({
        Error:
          "Wystąpił błąd podczas próby usunięcia artykułu. Sprawdź konsolę."
      });
    });
};

exports.deleteUser = (req, res) => {
  User.findOne({
    _id: req.query.ID
  })
    .then(result => {
      if (result.rank !== "admin") {
        return User.findOne({
          _id: req.query.ID
        })
          .remove()
          .then(() => {
            console.log("User has been deleted!");
            res.redirect("back");
          });
      } else {
        res.json({
          Error: "Administrator nie może zostać usunięty!"
        });
      }
    })
    .catch(err => {
      console.log(err.message);
      res.json({
        Error:
          "Wystąpił błąd podczas próby usunięcia użytkownika. Sprawdź konsolę."
      });
    });
};

exports.banUser = (req, res) => {
  //2 ZAPYTANIA DO BAZY - DO POPRAWY (TESTOWANIE)
  User.findOne({
    username: req.query.username
  })
    .then(result => {
      console.log(result);
      if (result.rank !== "admin")
        return User.findOne({
          username: req.query.username
        })
          .update(
            {
              isBanned: false
            },
            {
              isBanned: true
            }
          )
          .then(() => {
            console.log("User has been banned!");
            res.redirect("back");
          });
      else {
        res.json({
          Error: "Administrator nie może zostać zbanowany!"
        });
      }
    })
    .catch(err => {
      console.log(err.message);
      res.json({
        Error:
          "Wystąpił błąd podczas próby zbanowania użytkownika. Sprawdź konsolę."
      });
    });
};

exports.unBanUser = (req, res) => {
  User.findOne({
    _id: req.query.ID
  })
    .update(
      {
        isBanned: true
      },
      {
        isBanned: false
      }
    )
    .then(() => {
      console.log("User has been unbanned!");
      res.redirect("back");
    })
    .catch(err => {
      console.log(err.message);
      res.json({
        Error:
          "Wystąpił błąd podczas próby zbanowania użytkownika. Sprawdź konsolę."
      });
    });
};

exports.newRole = (req, res) => {
  let role = "";
  if (req.query.role === "redaktor") {
    role = "redaktor";
  } else if (req.query.role === "moderator") {
    role = "moderator";
  } else if (req.query.role === "user") {
    role = "user";
  } else {
    res.json({
      Error: "Taka rola nie istnieje!"
    });
  }

  User.findOne({
    _id: req.query.ID
  })
    .then(result => {
      if (result.rank !== "admin") {
        return User.findOne({
          _id: req.query.ID
        })
          .update({
            rank: role
          })
          .then(result => {
            console.log(result);
            console.log("Mod role has been granted.");
            res.redirect("back");
          })
          .catch(err => {
            console.log(err.message);
            res.json({
              Error:
                "Wystąpił błąd podczas próby nadania praw użytkownikowi. Sprawdź konsolę."
            });
          });
      } else {
        res.json({
          Error: "Nie możesz zmienić praw administratorowi!"
        });
      }
    })
    .catch(err => {
      console.log(err.message);
    });
};
