"use strict";

const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
require('dotenv').config();



//Schema for userDetailsSchema 
const userDetailsSchema = mongoose.Schema({
    firstName: { type: String, required: true, default: '' },
    lastName: { type: String, required: true, default: '' },
    location: { type: String, required: true, default: '' },
    githubUsername: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // confirmPassword: { type: String, required: true }
});

userDetailsSchema.methods.serialize = function() {
    return {
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        location: this.location || '',
        githubUsername: this.username || ''

    };
};

//Validating the password
userDetailsSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

//Hash the password
userDetailsSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};



//Model for the userDetailsschema
const Users = mongoose.model("Users", userDetailsSchema, );

module.exports = { Users };