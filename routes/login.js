const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require("passport");

const { PORT, DATABASE_URL } = require("../config");
const { Users } = require("../models");

router.get('/', (req, res) => {
    res.sendFile('/pages/login.html', { root: './public' });
});



// //***Login POST Request using bcrypt

router.post('/', (req, res) => {
    const loginRequiredFields = ["githubUsername", "password"];
    for (let i = 0; i < loginRequiredFields.length; i++) {
        const field = loginRequiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            // return res.status(400).send(message);
        }
    }

    //     Users.findOne({ githubUsername: req.body.githubUsername })
    //         .exec(function(err, user) {
    //             if (err) {
    //                 throw new Error(err);
    //             } else if (!user) {
    //                 let err = new Error('User not found.');
    //                 err.status = 401;
    //                 throw new Error(err);
    //             }
    //             // console.log(user);
    //             bcrypt.compare(req.body.password, user.password, function(err, result) {
    //                 if (result === true) {
    //                     res.status(201).json(user);
    //                 } else {
    //                     throw new Error(err);
    //                 }
    //             })
    //         });
    //     res.send('User found!');

});



module.exports = router;