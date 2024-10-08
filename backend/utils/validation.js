const { validationResult } = require('express-validator');
const { Ticket, Part, Note } = require('../db/models');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors
            .array()
            .forEach(error => errors[error.path] = error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    }
    next();
};

const properUserValidation = async (req, res, next) => {
    const { id } = req.user;

    const ticketId = req.params.id;

    try {
        const ticket = await Ticket.findByPk(parseInt(ticketId));

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket couldn't be found"
            })
        }

        if (ticket.createdBy !== id) {
            const err = new Error('Unauthorized');
            err.status = 403;
            err.title = 'Forbidden';
            return next(err);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const properPartValidation = async (req, res, next) => {
    const { id } = req.user;

    const partId = req.params.id;

    try {
        const part = await Part.findByPk(parseInt(partId));

        if (!part) {
            return res.status(404).json({
                message: "Part couldn't be found"
            })
        }

        const ticket = await Ticket.findByPk(part.ticketId);

        if (ticket.createdBy !== parseInt(id)) {
            const err = new Error('Unauthorized');
            err.status = 403;
            err.title = 'Forbidden';
            return next(err);
        }
        next();
    } catch (error) {
        next(error);
    }
}

const properNoteValidation = async (req, res, next) => {
    const { id } = req.user;

    const noteId = req.params.id;

    try {
        const note = await Note.findByPk(parseInt(noteId));

        if (!note) {
            return res.status(404).json({
                message: "Note couldn't be found"
            })
        }

        const ticket = await Ticket.findByPk(note.ticketId);

        if (note.userId !== id) {
            const err = new Error('Unauthorized');
            err.status = 403;
            err.title = 'Forbidden';
            return next(err);
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    handleValidationErrors,
    properUserValidation,
    properPartValidation,
    properNoteValidation
};