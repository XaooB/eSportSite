const mongoose = require("mongoose");
const { Schema } = require("mongoose");

mongoose.Promise = global.Promise;

const articleSchema = mongoose.Schema({
  title: String,
  category: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
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
