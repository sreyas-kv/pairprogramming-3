'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();


//----------------------GET Request to Login page --------------------------------//
router.get('/', (req, res) => {
    res.sendFile('/pages/login.html', { root: './public' });
})

//----------------------POST Login authentication -------------------------------//
const createAuthToken = function(user) {
    return jwt.sign({ user }, config.JWT_SECRET, {
        subject: user.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};

const localAuth = passport.authenticate('local', { session: false });
router.use(bodyParser.json());
//User enter githubUsername and pwd
router.post('/', localAuth, (req, res) => {
    const authToken = createAuthToken(req.user.serialize());
    // console.log('auth token: ', authToken);
    if (authToken) {
        // res.setHeader("Content-Type", "text/html");
        res.json({ authToken });

        // res.status(200).redirect('/hello');
    } else {
        console.log('test');
        res.send('Login failed');
    }
});

const jwtAuth = passport.authenticate('jwt', { session: false });

//exchange valid JWT 
router.post('/', jwtAuth, (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({ authToken });
    // console.log(authToken);
    // res.header('x-authorization', "Bearer " + authToken);
    // res.redirect('/hello');

});



module.exports = router;