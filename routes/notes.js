'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { Notes } = require("../models-notes");

//GET Notes
router.get('/', (req, res) => {
    Notes.find({}, function(err, notes) {
        let notesMap = {};
        notes.forEach(function(note) {
            notesMap[notes._id] = note;
        });
        res.send(notesMap);
    });
});

// POST: Add notes
// router.post('/', (req, res) => {
//     const requiredFields = ['notes'];
//     const missingField = requiredFields.find(field => !(field in req.body));
//     if (missingField) {
//         return res.status(422).json({
//             code: 422,
//             reason: 'ValidationError',
//             message: 'Missing field',
//             location: missingField
//         });
//     }
//     Notes.create({
//             notes: req.body.notes
//         })
//         .then(notes => res.status(201).json(notes.serialize()))
//         .catch(err => {
//             res.status(500).json({ message: "Internal Server error" });
//         });
// });


//PUT: Update existing notes  
router.put('/:id', (req, res) => {
    Notes.findByIdAndUpdate(
        req.params.id,
        req.body, { new: true },
        (err, todo) => {
            if (err) return res.status(500).send(err);
            return res.send(todo);

        });
});

//Delete Notes
router.delete("/:id", (req, res) => {
    Notes.findByIdAndRemove(req.params.notesId, (err, notes) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: 'Notes deleted successfully',
            id: notes._id
        };
        return res.status(200).send(response);
    })
});

module.exports = router;