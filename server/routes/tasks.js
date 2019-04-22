const express = require("express");

const Task = require("../models/tasks");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
    const task = new Task({
        content: req.body.content,
        creator: req.userData.userId
    });
    task.save().then(result => {
        res.status(201).json({
            message: 'Task Added Succesfully!',
            taskId: result._id
        });
    });
});

router.put("/:id", checkAuth, (req, res, next) => {
    const task = new Task({
        _id: req.body.id,
        content: req.body.content
    });
    Task.updateOne({ _id: req.params.id }, task).then(result => {
        res.status(200).json({ message: "update success" });
    });
});

router.get('/:id', checkAuth,  (req, res, next) => {
    Task.findById(req.params.id).then(task => {
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found!' });
        }
    });
});


router.get('', checkAuth, (req, res, next) => {

    const userId =  req.userData.userId;

    Task.find({ creator: userId }).then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Tasks fetch success',
            tasks: documents
        });
    });
});

router.delete('/:id', checkAuth, (req, res, next) => {
    Task.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            message: 'Task deleted',
        });
    });
});

module.exports = router;