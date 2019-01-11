const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.port || 3000;

const { mongoose } = require('./db/mongoose');
const userController = require('../controller/userController');
const todoController = require('../controller/todoController');

var app = express();
app.use(bodyParser.json());
app.use('/todo', todoController);
app.use('/user', userController);

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})