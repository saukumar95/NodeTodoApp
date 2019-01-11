var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 6
    }
});

module.exports = { User };