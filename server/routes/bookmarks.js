const express = require("express");

const Bookmark = require("../models/bookmarks");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
    const bookmark = new Bookmark({
        url: req.body.url,
        name: req.body.name,
        creator: req.userData.userId
    });
    bookmark.save().then(result => {
        res.status(201).json({
            message: 'Bookmark Added Succesfully!',
            bookmarkId: result._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {

    const userId =  req.userData.userId;

    Bookmark.find({ creator: userId }).then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Bookmark fetch success',
            bookmarks: documents
        });
    });
});

router.delete('/:id', checkAuth, (req, res, next) => {
    Bookmark.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            message: 'Bookmark deleted',
        });
    });
});

module.exports = router;