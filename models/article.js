const mongoose = require("mongoose"),
  { getDate } = require("./../public/js/getDate");
mongoose.Promise = global.Promise;

const articleSchema = mongoose.Schema({
  title: String,
  category: String,
  author: String,
  desc: String,
  body: String,
  date: Date,
  img: String,
  isMain: {
    type: Boolean,
    default: false
  }
});

var Article = mongoose.model("Article", articleSchema);

module.exports = {
  Article
};
