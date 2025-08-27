const express = require('express');
const { requireAuth } = require('../../utils/auth');

const { Client, Ticket, Location, LocationPhoneNumber } = require('../../db/models');
const { singleFileUpload, singleMulterUpload } = require('../../awsS3');
const { where } = require('sequelize');

const router = express.Router();

//Get All Clients
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
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const locations = await Location.findAll({
            where: { clientId: client.id }
        });

        for (const location of locations) {
            const phoneNumbers = await LocationPhoneNumber.findAll({
                where: { locationId: location.id }
            });
            location.dataValues.phoneNumbers = phoneNumbers;
        }

        return res.json({ ...client.toJSON(), locations });
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

//Add a Location to a Client
router.post('/:id/locations', async (req, res, next) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const { name, addressLine1, addressLine2, city, state, zipcode } = req.body;
        const location = await Location.create({
            name,
            addressLine1,
            addressLine2,
            city,
            state,
            zipcode,
            clientId: client.id
        });

        return res.status(201).json(location);
    } catch (error) {
        next(error);
    }
});

//Remove a Location from a Client
router.delete('/:clientId/locations/:locationId', async (req, res, next) => {
    try {
        const { clientId, locationId } = req.params;

        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const location = await Location.findByPk(locationId);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        await location.destroy();

        return res.status(200).json({ message: 'Location removed from client' });
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