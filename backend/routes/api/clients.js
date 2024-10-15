const express = require('express');
const { requireAuth } = require('../../utils/auth');

const { Client, Ticket } = require('../../db/models');
const { singleFileUpload, singleMulterUpload } = require('../../awsS3');

const router = express.Router();

//Get All CLients
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || null;
        const size = parseInt(req.query.size) || null;

        const where = {};

        const clients = await Client.findAll({
            where,
            limit: size,
            offset: (page - 1) * size
        });

        return res.json(clients);

    } catch (error) {
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
router.post('/', requireAuth, singleMulterUpload('image'), async (req, res, next) => {
    try {
        const { firstName, lastName, companyName, email, phoneNumber } = req.body;

        const profilePicUrl = req.file
            ? await singleFileUpload({ file: req.file, public: true })
            : null;

        const client = await Client.create({
            firstName,
            lastName,
            companyName,
            email,
            phoneNumber,
            profilePicUrl
        });

        return res.json(client);
    } catch (error) {
        next(error);
    }
});

//Edit a Client
router.put('/:id', requireAuth, singleMulterUpload('image'), async (req, res, next) => {
    try {
        const client = await Client.findByPk(req.params.id);

        const { firstName, lastName, companyName, email, phone } = req.body;

        const profilePicUrl = req.file
            ? await singleFileUpload({ file: req.file, public: true })
            : client.profilePicUrl;

        client.firstName = firstName || client.firstName;
        client.lastName = lastName || client.lastName;
        client.companyName = companyName || client.companyName;
        client.email = email || client.email;
        client.phone = phone || client.phone;
        client.profilePicUrl = profilePicUrl;

        await client.save();

        return res.json(client);
    } catch (error) {
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