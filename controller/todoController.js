const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { Todo } = require('../models/todo');

router.post('/addTodo', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    todo.save().then(() => {
        res.send({
            responseMessage: "Successfully inserted"
        });
    }, e => {
        res.status(400).send(e);
    })

});

router.get('/getTodos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos })
    }, e => {
        res.status(400).send(e);
    })
});

router.get('/getTodo/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({
                errorResponse: "No todos found.."
            });
        } else {
            res.send({ todo })
        }
    }).catch(e => {
        res.status(400).send(e)
    })
});

router.delete('/deleteTodo/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    };
    Todo.deleteOne({ _id: id }, e => {
        res.send({
            responseMessage: "Successfully deleted.!"
        });
    }, e => {
        res.status(400).send(e);
    });
});

router.put('/updateTodo/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }
    Todo.findOneAndUpdate({ _id: id }, req.body, e => {
        res.send({
            responseMessage: "Successfully updated."
        });
    }, e => {
        res.status(400).send(e);
    });
});

module.exports = router