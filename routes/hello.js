'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });


// GET to Hello page
router.get('/', (req, res) => {
    res.sendFile('/pages/hello.html', { root: './public' });

});

module.exports = router;