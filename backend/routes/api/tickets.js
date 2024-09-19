const express = require('express');

const { Ticket, Status, Client, User, Part } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const { properUserValidation } = require('../../utils/validation');

const router = express.Router();

// Get all Tickets
router.get('/', requireAuth, async (req, res, next) => {
    try {

        const { status, client, createdBy } = req.query;

        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        //Declare where
        const where = {};

        //Status Filter
        if (status) {
            where.status = parseInt(status);
        }

        //Client Filter
        if (client) {
            where.client = parseInt(client);
        }

        //CreatedBy Filter
        if (createdBy) {
            where.createdBy = parseInt(createdBy);
        }

        //Get Tickets
        const tickets = await Ticket.findAll({
            where,
            limit: size,
            offset: (page - 1) * size
        });

        let Tickets = [];

        for (const ticket of tickets) {
            ticket.status = await Status.findByPk(where.status);
            ticket.client = await Client.findByPk(where.client);
            ticket.createdBy = await User.findByPk(where.createdBy);
            const values = ticket.toJSON();
            Tickets.push(values);
        }

        return res.json(Tickets);

        return res.json(tickets);

    } catch (error) {
        next(error);
    }
});

// Get Tickets created by Current User
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        const tickets = await Ticket.findAll({
            where: {
                createdBy: req.user.id
            }
        });

        return res.json(tickets);

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

        const StatusInfo = await Status.findByPk(ticket.statusId);

        const safeTicket = {
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            checkIn: ticket.checkIn,
            checkOut: ticket.checkOut,
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

        const { title, description, checkIn, checkOut, statusId } = req.body;

        ticket.title = title || ticket.title;
        ticket.description = description || ticket.description;
        ticket.checkIn = checkIn || ticket.checkIn;
        ticket.checkOut = checkOut || ticket.checkOut;
        ticket.statusId = statusId || ticket.statusId;

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

module.exports = router;