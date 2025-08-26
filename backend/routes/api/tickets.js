const express = require('express');

const { Ticket, Status, Client, User, Part, Note } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const { properUserValidation } = require('../../utils/validation');
const { generateRandomPassword } = require('js-random-generator');

const router = express.Router();

// Get all Tickets
router.get('/', requireAuth, async (req, res, next) => {
    try {

        const { status, client, createdBy } = req.query;

        const page = parseInt(req.query.page) || null;
        const size = parseInt(req.query.size) || null;

        const where = {};

        if (status) {
            where.status = parseInt(status);
        }

        if (client) {
            where.client = parseInt(client);
        }

        if (createdBy) {
            where.createdBy = parseInt(createdBy);
        }

        const tickets = await Ticket.findAll({
            where,
            limit: size,
            offset: (page - 1) * size
        });

        let Tickets = [];

        for (const ticket of tickets) {
            ticket["status"] = await Status.findByPk(where.status);
            ticket.clientId = await Client.findByPk(where.client || ticket.clientId);
            ticket.createdBy = await User.findByPk(where.createdBy || ticket.createdBy);
            const values = ticket.toJSON();

            Tickets.push(values);
        }

        return res.json(Tickets);

    } catch (error) {
        next(error);
    }
});

// Track a Ticket by hashed ID
router.get('/track/:hashedId', async (req, res) => {
    const { hashedId } = req.params;

    // Retrieve ticket by original ticket ID (stored with the hash)
    const ticket = await Ticket.findOne({ where: { hashedId } });

    if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
    }

    if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
    }

    const CreatedBy = await User.findByPk(ticket.createdBy);

    const ClientInfo = await Client.findByPk(ticket.clientId);

    const Parts = await Part.findAll({
        where: {
            ticketId: ticket.id
        }
    });

    const StatusInfo = await Status.findByPk(ticket.statusId);

    const safeTicket = {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        checkIn: ticket.checkIn,
        checkOut: ticket.checkOut,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        CreatedBy,
        ClientInfo,
        Parts,
        StatusInfo
    }

    // If valid, send ticket data for tracking
    res.json(safeTicket);
});

// Get Tickets created by Current User
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        const tickets = await Ticket.findAll({
            where: {
                createdBy: req.user.id
            }
        });

        let Tickets = [];

        for (const ticket of tickets) {
            ticket.clientId = await Client.findByPk(ticket.clientId);
            const values = ticket.toJSON();
            Tickets.push(values);
        }

        return res.json(Tickets);

    } catch (error) {
        next(error);
    }
});

// Get Ticket by ID
router.get('/:id', requireAuth, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const CreatedBy = await User.findByPk(ticket.createdBy);

        const ClientInfo = await Client.findByPk(ticket.clientId);

        const Parts = await Part.findAll({
            where: {
                ticketId: ticket.id
            }
        });

        let Notes = await Note.findAll({

        })

        const StatusInfo = await Status.findByPk(ticket.statusId);

        const safeTicket = {
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            checkIn: ticket.checkIn,
            checkOut: ticket.checkOut,
            hashedId: ticket.hashedId,
            CreatedBy,
            ClientInfo,
            Parts,
            StatusInfo
        }

        return res.json(safeTicket);

    } catch (error) {
        next(error);
    }
});

// Create a Ticket
router.post('/', requireAuth, async (req, res, next) => {
    try {
        const { title, description, clientId } = req.body;

        const ticket = await Ticket.create({
            title,
            description,
            checkIn: null,
            checkOut: null,
            clientId,
            statusId: 1,
            hashedId: generateRandomPassword(10),
            createdBy: req.user.id
        });

        return res.json(ticket);

    } catch (error) {
        next(error);
    }
});

// Update a Ticket
router.put('/:id', requireAuth, properUserValidation, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const { title, description, checkIn, checkOut, statusId, clientId } = req.body;

        ticket.title = title || ticket.title;
        ticket.description = description || ticket.description;
        ticket.checkIn = checkIn || ticket.checkIn;
        ticket.checkOut = checkOut || ticket.checkOut;
        ticket.statusId = statusId || ticket.statusId;
        ticket.clientId = clientId || ticket.clientId;

        await ticket.save();

        return res.json(ticket);

    } catch (error) {
        next(error);
    }
});

//Get All Parts by a Ticket's Id
router.get('/:id/parts', requireAuth, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const parts = await Part.findAll({
            where: {
                ticketId: ticket.id
            }
        });

        return res.json({
            Parts: parts
        });

    } catch (error) {
        next(error);
    }
});

// Add a Part to a Ticket based on the Ticket's Id
router.post('/:id/parts', requireAuth, properUserValidation, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const { name, description, imageUrl } = req.body;

        const part = await Part.create({
            name,
            description,
            imageUrl,
            ticketId: ticket.id
        });

        return res.json(part);

    } catch (error) {
        next(error);
    }
});

//Get All the notes for a Ticket based on Ticket's Id
router.get('/:id/notes', requireAuth, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const notes = await Note.findAll({
            where: {
                ticketId: ticket.id
            }
        });

        return res.json({
            Notes: notes
        });

    } catch (error) {
        next(error);
    }
});

//Add a Note to a Ticket based on the Ticket's Id
router.post('/:id/notes', requireAuth, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const { note } = req.body;

        const createdNote = await Note.create({
            note,
            userId: (parseInt(req.user.id)),
            ticketId: ticket.id
        });

        return res.json(createdNote);

    } catch (error) {
        next(error);
    }
});

//Delete a Ticket by Id
router.delete('/:id', requireAuth, properUserValidation, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        await ticket.destroy();

        return res.json({ "message": "Successfully Deleted" });

    } catch (error) {
        next(error);
    }
});

//Get the Status of a Ticket based on the Ticket's Id
router.get('/:id/status', requireAuth, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const status = await Status.findByPk(ticket.statusId);

        return res.json(status);

    } catch (error) {
        next(error);
    }
});

module.exports = router;