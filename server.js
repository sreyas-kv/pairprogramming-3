"use strict";

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const bodyParser = require('body-parser');

//Mongoose promise
mongoose.Promise = global.Promise;

// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const { PORT, DATABASE_URL } = require("./config");
const { Users } = require("./models");

//Setting the routes
const auth = require('./routes/auth');
// const login = require('./routes/login');
const index = require('./routes/index');
const signup = require('./routes/signup');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
require('./passport');


// app.use('/auth', auth);
app.use('/login', auth);
app.use('/index', index);
app.use('/signup', signup);


//enable logs using morgan
app.use(require('morgan')('common'));

//Set the static folder
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile("/pages/index.html", { root: './public' });
})

// catch-all endpoint if client makes request to non-existent endpoint
app.use("*", function(req, res) {
    res.status(404).json({ message: "Route Not Found" });
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(
            databaseUrl,
            err => {
                if (err) {
                    return reject(err);
                }
                server = app
                    .listen(port, () => {
                        console.log(`Your app is listening on port ${port}`);
                        resolve();
                    })
                    .on("error", err => {
                        mongoose.disconnect();
                        reject(err);
                    });
            }
        );
    });
}

// this function closes the server, and returns a promise.
function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log("Closing server");
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}


// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };