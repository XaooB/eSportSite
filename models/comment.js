const mongoose = require("mongoose"),
  { getDate } = require("./../public/js/getDate"),
  moment = require("moment");
mongoose.Promise = global.Promise;

const commentSchema = mongoose.Schema({
  username: String,
  body: String,
  title: String,
  category: String,
  date: {
    type: Date,
    default: new Date()
  }
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = {
  Comment
};
