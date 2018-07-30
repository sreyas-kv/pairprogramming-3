"use strict";
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const router = express.Router();
const bodyParser = require('body-parser');

//Mongoose promise
mongoose.Promise = global.Promise;

// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const { PORT, DATABASE_URL } = require("./config");
// const { Users } = require("./models");
const { localStrategy, jwtStrategy } = require('./routes/strategies');


const app = express();
passport.use(localStrategy);
app.use(express.json());
app.use(bodyParser.json());



//enable logs using morgan
app.use(require('morgan')('common'));

// CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.send(204);
    }
    next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

//Setting the routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const signup = require('./routes/signup');
const welcome = require('./routes/welcome');

app.use('/login', auth);
app.use('/index', index);
app.use('/signup', signup);
app.use('/welcome', welcome);

const jwtAuth = passport.authenticate('jwt', { session: false });

//Protected endpoint which needs a valid JWT to access it
app.get('/protected', jwtAuth, (req, res) => {
    return res.json({
        data: 'pairprogramming'
    });
});

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