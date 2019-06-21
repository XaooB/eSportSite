const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const commentReplies = require("./comment-reply");
mongoose.Promise = global.Promise;

const commentSchema = new Schema({
  username: String,
  body: String,
  title: String,
  category: String,
  verified: {
    type: Boolean,
    default: false
  },
  date: Date
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
