const mongoose = require('mongoose');
const user = 'heroku_w7k326bs',
    password = 'svf1a22gsj52g99o21frsvjepe';

mongoose.Promise = global.Promise;
var connection = mongoose.connect(process.env.MONGODB_URI || `mongodb://${user}:${password}@ds153113.mlab.com:53113/${user}`, {
    useMongoClient: true
}).then(() => {
    console.log('Connected to database!');
}).catch((err) => {
    console.log(`Wystąpił error! ${err.message}`);
});

module.exports = {mongoose};