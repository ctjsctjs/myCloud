const express = require("express");

const Post = require("../models/posts");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        creator: req.userData.userId
    });
    post.save().then(result => {
        res.status(201).json({
            message: 'Post Added Succesfully!',
            postId: result._id
        });
    });
});

router.put("/:id", checkAuth, (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        res.status(200).json({ message: "update success" });
    });
});

router.get('/:id', checkAuth,  (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found!' });
        }
    });
});


router.get('', checkAuth, (req, res, next) => {

    const userId =  req.userData.userId;

    Post.find({ creator: userId }).then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Posts fetch success',
            posts: documents
        });
    });
});

router.delete('/:id', checkAuth, (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            message: 'Post deleted',
        });
    });
});

module.exports = router;