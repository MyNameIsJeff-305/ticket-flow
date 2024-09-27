const express = require('express');
const { requireAuth } = require('../../utils/auth');

const { Client, Ticket } = require('../../db/models');

const router = express.Router();

//Get All CLients
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const clients = await Client.findAll();

        return res.json(clients);
    }
    catch (error) {
        next(error);
    }
});

//Get a Client by clientId
router.get('/:id', requireAuth, async (req, res, next) => {
    try {
        const client = await Client.findByPk(req.params.id);

        return res.json(client);
    }
    catch (error) {
        next(error);
    }
});

//Add a Client
router.post('/', requireAuth, async (req, res, next) => {
    try {
        const { firstName, lastName, companyName, email, phone } = req.body;

        const client = await Client.create({
            firstName,
            lastName,
            companyName,
            email,
            phone
        });

        return res.json(client);
    }
    catch (error) {
        next(error);
    }
})

//Edit a Client
router.put('/:id', requireAuth, async (req, res, next) => {
    try {
        const client = await Client.findByPk(req.params.id);

        const { firstName, lastName, companyName, email, phone } = req.body;

        client.firstName = firstName || client.firstName;
        client.lastName = lastName || client.lastName;
        client.companyName = companyName || client.companyName;
        client.email = email || client.email;
        client.phone = phone || client.phone;

        await client.save();

        return res.json(client);
    }
    catch (error) {
        next(error);
    }
});

//Delete a Client
router.delete('/:id', requireAuth, async (req, res, next) => {
    try {
        const client = await Client.findByPk(req.params.id);

        await client.destroy();

        return res.json({ message: 'Client deleted' });
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;