const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.port || 3001;

const { mongoose } = require('./db/mongoose');
const userController = require('../controller/userController');
const todoController = require('../controller/todoController');

var app = express();
mongoose.set('useFindAndModify', false);
app.use(cors());
app.use(bodyParser.json());
app.use('/todo', todoController);
app.use('/user', userController);

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})