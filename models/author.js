const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const authorSchema = mongoose.Schema({
  nickname: {
    type: String,
    unique: true
  },
  rank: String,
  avatar: String,
  info: String
});

var Author = mongoose.model("Author", authorSchema);

module.exports = { Author };
