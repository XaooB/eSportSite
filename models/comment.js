const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const commentReplies = require("./comment-reply");
mongoose.Promise = global.Promise;

const commentSchema = new Schema({
  username: String,
  body: String,
  title: String,
  category: String,
  date: {
    type: Date,
    default: Date.now()
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
