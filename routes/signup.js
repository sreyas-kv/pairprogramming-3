const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { Users } = require("../models");

//--------------------- Get to Signup Page ----------------------//

router.get('/', (req, res) => {
    res.sendFile('/pages/signup.html', { root: './public' });
});

//--------------------- Post to register a new user-----------------------//
//Check for required fields
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['githubUsername', 'password'];
    const missingField = requiredFields.find(field => !(field in req.body));
    if (missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }

    //Checking if the  input values are string
    const stringFields = ['firstName', 'lastName', 'location', 'githubUsername', 'password'];
    const nonStringField = stringFields.find(
        field => field in req.body && typeof req.body[field] != 'string');

    if (nonStringField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Incorrect field type: ecprected string',
            location: nonStringField
        });
    }
    // Trimming the user name and password and need min chars
    const explicityTrimmedFields = ['githubUsername', 'password'];
    const nonTrimmedField = explicityTrimmedFields.find(
        field => req.body[field].trim() !== req.body[field]
    );
    if (nonTrimmedField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            messgae: 'Cannot start or end with whitespace',
            location: nonTrimmedField
        });
    }
    const sizedFields = {
        githubUsername: {
            min: 1
        },
        password: {
            min: 6,
            max: 50
        }
    };
    const tooSmallField = Object.keys(sizedFields).find(
        field =>
        'min' in sizedFields[field] &&
        req.body[field].trim().length < sizedFields[field].min
    );
    const tooLargeField = Object.keys(sizedFields).find(
        field =>
        'max' in sizedFields[field] &&
        req.body[field].trim().length > sizedFields[field].max
    );

    if (tooSmallField || tooLargeField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: tooSmallField ?
                `Must be at least ${sizedFields[tooSmallField]
                .min} characters long` : `Must be at most ${sizedFields[tooLargeField]
                .max} characters long`,
            location: tooSmallField || tooLargeField
        });
    }
    let { firstName = '', lastName = '', location = '', githubUsername, password } = req.body;
    firstName = firstName.trim();
    lastName = lastName.trim();
    location = location.trim();
    return Users.find({ githubUsername })
        .count()
        .then(count => {
            // Checking is user exists
            if (count > 0) {
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'Username already taken',
                    location: 'username'
                });
            }
            return Users.hashPassword(password);
        })
        .then(hash => {
            return Users.create({
                firstName,
                lastName,
                location,
                githubUsername,
                password: hash,
            });
        })
        .then(user => {
            return res.status(201).json(user.serialize());
        })
        .catch(err => {
            if (err.reson === 'ValidationError') {
                return res.status(err.code).json(err);
            }
            res.status(500).json({ code: 500, message: 'Internal server error' });
        });
});


module.exports = router;