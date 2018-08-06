"use strict";

const mongoose = require("mongoose");
require('dotenv').config();


//Schema for Adding user to notes list
const notesSchema = mongoose.Schema({
    notes: { type: String, default: '' }
});



notesSchema.methods.serialize = function() {
    return {
        id: this._id,
        notes: this.notes || ''
    };
};

//Model for the notesschema
const Notes = mongoose.model("Notes", notesSchema, );

module.exports = { Notes };