const express = require('express');
const router = express.Router();

// const { PORT, DATABASE_URL } = require("../config");
const { Users } = require("../models");

router.post('/', (req, res) => {
    console.log(req.body);
    const requiredFields = ["firstName", "lastName", "location", "githubUsername", "password", "confirmPassword"];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            location: req.body.location,
            githubUsername: req.body.githubUsername,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        })
        .then(user => res.status(201).json(user))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });

        });
    res.send(req.body);
});



// GET requests to / signup
router.get('/', (req, res) => {
    res.sendFile('/pages/signup.html', { root: './public' });

    // Users.find()
    //     .then(users => {
    //         res.json({
    //             users: users.map(users => users)
    //         });
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.status(500).json({ message: "Internal server error" });
    //     });
});



// //GET Signup page
// app.get('/pairprogramming/signup', (req, res) => {
//     res.sendFile("/pages/signup.html", { root: './public' });
// });
// POST Signup request checking mandatory fields

//Login Authenticate user on GET request

// app.get('/pairprogramming/login', (req, res) => {
//     res.sendFile('/pages/login.html', { root: './public' });

// Users.find()
//     .then(users => {
//         res.json({
//             users: users.map(users => users)
//         });
//     })
//     .catch(err => {
//         console.error(err);
//         res.status(500).json({ message: "Internal server error" });
//     });
// });


module.exports = router;