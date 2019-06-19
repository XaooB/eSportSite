const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    default: "user"
  },
  avatar: {
    type: String,
    default: "/assets/img/avatars/default_avatar.jpg"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  isBanned: {
    type: Boolean,
    default: false
  }
});

var User = mongoose.model("User", userSchema);

module.exports = { User };
