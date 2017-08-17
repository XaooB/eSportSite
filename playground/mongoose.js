const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var connection = mongoose.connect(`mongodb://${user}:${password}@ds163679.mlab.com:63679/heroku_5xk30rz3`, {
    useMongoClient: true
});

connection.then(() => {
    console.log('Connected to database!');
}, (err) => {
    console.log(`Wystąpił error! ${err.message}`);
});

module.exports = {
    mongoose
};
