const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

const JWT_TOKEN = "lean_mean_fighting_machine";

router.post("/signup", (req, res, next) => {

    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User Created!',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });
    });
});

router.post("/login", (req, res, next) => {
    let fetchedUser; 

    //Find matching email
    User.findOne({ email: req.body.email}) 

    //Upon Async response
    .then(user => { 

        //If no email match
        if (!user) { 
            return res.status(401).json({
                message: "Auth failed: User does not exist"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }) 

    //Compare hashed password and hashed input password matches
    .then(result => {
        //If does not match
        if (!result){
            return res.status(401).json({
                message: "Auth failed: Password does not match"
            });
        };

        //If match, respond with token
        const token = jwt.sign(
            { email: fetchedUser.email, userId: fetchedUser._id }, 
            JWT_TOKEN, 
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token: token,
            expiresIn: "3600"
        });
    })
    .catch(err => {
        return res.status(401).json({
            message: err
        });
    });
});


module.exports = router;