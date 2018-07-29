"use strict";

const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
require('dotenv').config();



//Schema for userDetailsSchema 
const userDetailsSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: { type: String, required: true },
    githubUsername: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
});
// userDetailsSchema.plugin(uniqueValidator);


//Model for the userDetailsschema
const Users = mongoose.model("Users", userDetailsSchema, );

//Display error message if username is duplicate in the db



//hash the password
userDetailsSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

// hash the password thinkful code
userDetailsSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

userDetailsSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};



module.exports = { Users };