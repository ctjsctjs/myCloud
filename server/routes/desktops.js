const express = require("express");

const Desktop = require("../models/desktops");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
    const desktop = new Desktop({
        url: req.body.url,
        name: req.body.name,
        creator: req.userData.userId
    });
    desktop.save().then(result => {
        res.status(201).json({
            message: 'Desktop Added Succesfully!',
            desktopId: result._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {

    const userId =  req.userData.userId;

    Desktop.find({ creator: userId }).then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Desktop fetch success',
            desktops: documents
        });
    });
});

router.delete('/:id', checkAuth, (req, res, next) => {
    Desktop.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            message: 'Desktop deleted',
        });
    });
});

module.exports = router;