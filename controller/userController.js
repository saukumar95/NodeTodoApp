const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

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