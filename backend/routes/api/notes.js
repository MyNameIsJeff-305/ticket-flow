const express = require('express');

const { Note } = require('@db/models');
const { requireAuth } = require('@utils/auth');
const { properNoteValidation } = require('@utils/validation');

const router = express.Router();

//Get All Notes
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const notes = await Note.findAll();

        return res.json(notes);
    } catch (error) {
        next(error);
    }
});

//Get all notes of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        const notes = await Note.findAll({
            where: {
                userId: req.user.id
            }
        });

        return res.json({ Notes: notes });
    } catch (error) {
        next(error);
    }
});

//Add a Note
router.post('/', requireAuth, async (req, res, next) => {
    try {
        const { note, ticketId, userId } = req.body;

        const newNote = await Note.create({
            note: note,
            ticketId: parseInt(ticketId),
            userId: parseInt(userId)
        });

        return res.json(newNote);

    } catch (error) {
        next(error);
    }
});

//Edit a Note
router.put('/:id', requireAuth, properNoteValidation, async (req, res, next) => {
    try {
        const currentNote = await Note.findByPk(req.params.id);

        const { note } = req.body;

        currentNote.note = note || currentNote.note;

        await currentNote.save();

        return res.json(currentNote);

    } catch (error) {
        next(error);
    }
});

//Delete a Note
router.delete('/:id', requireAuth, properNoteValidation, async (req, res, next) => {
    try {
        const currentNote = await Note.findByPk(req.params.id);

        await currentNote.destroy();

        return res.json({ message: 'Note Deleted' });

    } catch (error) {
        next(error);
    }
});

module.exports = router;