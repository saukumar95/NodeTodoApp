const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const jsonwebtoken = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email.'
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jsonwebtoken.sign({ _id: user._id.toHexString(), access }, 'abc123', { expiresIn: 60 * 60 }).toString();

    user.tokens = user.tokens.concat([{ access, token }]);

    return user.save().then(() => {
        return token;
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = { User };