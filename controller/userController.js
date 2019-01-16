const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { User } = require('../models/user');


router.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    const user = new User(body);
    user.save().then((user) => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch(e => {
        res.status(400).send(e);
    })

})


router.post('/addUser', (req, res) => {
    const user = new User({
        email: req.body.email
    });
    user.save().then(() => {
        res.send({
            responseMessage: "Successfully inserted"
        });
    }, e => {
        res.status(400).send(e);
    });
});

router.get('/getUsers', (req, res) => {
    User.find().then(user => {
        if (!user) {
            res.status(404).send();
        } else {
            res.send(user)
        }
    }, e => {
        res.status(400).send(e);
    });
});

module.exports = router;