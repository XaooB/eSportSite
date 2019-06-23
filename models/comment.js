const mongoose = require("mongoose");
const { Schema } = require("mongoose");
mongoose.Promise = global.Promise;

const commentSchema = new Schema({
  username: String,
  body: String,
  title: String,
  category: String,
  date: Date,
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  verified: {
    type: Boolean,
    default: false
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
