const express = require('express');

const { Part, Ticket } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { properPartValidation } = require('../../utils/validation');


const router = express.Router();

// Get all Parts
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const parts = await Part.findAll();

        const Parts = [];

        for (const part of parts) {
            const ticket = await Ticket.findByPk(part.ticketId);

            const value = {};
            value.id = part.id;
            value.name = part.name;
            value.description = part.description;
            value.imageUrl = part.imageUrl;
            value.Ticket = ticket;

            Parts.push(value);
        }

        return res.json(Parts);
    } catch (error) {
        next(error);
    }
});

//Get a Part
router.get('/:id', requireAuth, async (req, res, next) => {
    try {
        const part = await Part.findByPk(req.params.id);

        const ticket = await Ticket.findByPk(part.ticketId);

        const value = {};
        value.id = part.id;
        value.name = part.name;
        value.description = part.description;
        value.imageUrl = part.imageUrl;
        value.Ticket = ticket;

        return res.json(value);
    } catch (error) {
        next(error);
    }
});

//Create a Part
router.post('/', requireAuth, properPartValidation, async (req, res, next) => {
    try {
        const { name, description, imageUrl, ticketId } = req.body;

        const part = await Part.create({
            name,
            description,
            imageUrl,
            ticketId
        });

        return res.json(part);
    } catch (error) {
        next(error);
    }
});

//Edit a Part
router.put('/:id', requireAuth, properPartValidation, async (req, res, next) => {
    try {
        const part = await Part.findByPk(req.params.id);

        const { name, description, imageUrl } = req.body;

        part.name = name || part.name;
        part.description = description || part.description;
        part.imageUrl = imageUrl || part.imageUrl;

        await part.save();

        return res.json(part);

    } catch (error) {
        next(error);
    }
});

//Delete a Part
router.delete('/:id', requireAuth, properPartValidation, async (req, res, next) => {
    try {
        const part = await Part.findByPk(req.params.id);

        await part.destroy();

        return res.json({ message: 'Part deleted' });

    } catch (error) {
        next(error);
    }
});

module.exports = router;