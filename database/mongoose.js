const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var connection = mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
});

connection.then(() => {
    console.log('Connected to database!');
}, (err) => {
    console.log(`Wystąpił error! ${err.message}`);
});

module.exports = {mongoose: mongoose};