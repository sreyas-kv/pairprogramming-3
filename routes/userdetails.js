'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { Users } = require("../models");


// GET to Hello page
router.get('/', (req, res) => {
    Users.find({}, function(err, users) {
        let userMap = {};
        users.forEach(function(user) {
            userMap[user._id] = user;
        });
        console.log(userMap)
        res.send(userMap);
    });
});


module.exports = router;