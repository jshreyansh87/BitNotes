const express = require('express');
const router = express.Router();
const FetchUser = require('../Middlewares/FetchUser');
const Note = require('../Models/Notes');
const { body, validationResult } = require('express-validator');

router.get('/', FetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        return res.json({ notes });
    } catch (error) {
        return res.status(500).json({ error: "An error occured while processing your request" });
    }
});

router.post('/', FetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = await Note.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag ?? Note.tag
        });

        return res.json({ note });
    } catch (error) {
        return res.status(500).json({ error: "An error occured while processing your request" });
    }
});

router.put('/:noteId', FetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let note = await Note.findOne({ _id: req.params.noteId, user: req.user.id });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        note = await Note.findByIdAndUpdate(req.params.noteId, {
            $set: {
                title: req.body.title ?? note.title,
                description: req.body.description ?? note.description,
                tag: req.body.tag ?? note.tag
            }
        }, { new: true });

        return res.json({ note });
    } catch (error) {
        return res.status(500).json({ error: "An error occured while processing your request" });
    }
});

router.delete('/:noteId', FetchUser, async (req, res) => {
    try {
        let note = await Note.findOne({ _id: req.params.noteId, user: req.user.id });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        note = await Note.findByIdAndDelete(req.params.noteId);

        return res.json({ "Success": "Your note has been delete" });
    } catch (error) {
        return res.status(500).json({ error: "An error occured while processing your request" });
    }
});

module.exports = router;