const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
    nickname: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    rank: {
        type: String,
        default: 'user'
    },
    avatar: {
        type: String,
        default: '/assets/img/avatars/default-avatar.jpg'
    }
});

var User = mongoose.model('User', userSchema);

module.exports = {
    User
};
