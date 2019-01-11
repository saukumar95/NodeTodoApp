var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected")
    }
});

module.exports = { mongoose }