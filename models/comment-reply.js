const mongoose = require("mongoose");
const { Schema } = require("mongoose");
mongoose.Promise = global.Promise;

const commentReplySchema = new Schema({
  username: String,
  body: String,
  title: String,
  category: String,
  date: {
    type: Date,
    default: Date.now()
  }
});

const commentReply = mongoose.model("CommentReply", commentReplySchema);
module.exports = commentReply;
