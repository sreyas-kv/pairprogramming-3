'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { Users } = require("../models");


// GET to Hello page
router.get('/', (req, res) => {
    // res.send(userMap);
    console.log('Hello');
    res.sendFile('/pages/hello.html', { root: './public' });

});


module.exports = router;