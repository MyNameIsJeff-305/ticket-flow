const express = require('express');
const { requireAuth } = require('@utils/auth');

const { Op } = require('sequelize');
const { sequelize } = require('@db/models');

const { Client, Ticket, Location, LocationPhoneNumber, locationEmail } = require('@db/models');
const { singleFileUpload, singleMulterUpload } = require('@backend/awsS3');

const router = express.Router();

//Get All Clients
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        const search = req.query.search || '';

        const where = {};

        if (search && search.trim() !== '') {
            const dialect = sequelize.getDialect();
            const searchOp = dialect === 'sqlite' ? Op.like : Op.iLike;

            where[Op.or] = [
                { firstName: { [searchOp]: `%${search}%` } },
                { lastName: { [searchOp]: `%${search}%` } },
                { companyName: { [searchOp]: `%${search}%` } }
            ];
        }

        const options = {};
        if (!isNaN(size)) options.limit = size;
        if (!isNaN(page)) options.offset = (page - 1) * size;

        const clients = await Client.findAll({ where, ...options });

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

            const emails = await locationEmail.findAll({
                where: { locationId: location.id }
            });
            location.dataValues.emails = emails;
        }

        const clientTickets = await Ticket.findAll({
            where: { clientId: client.id }
        });

        client.dataValues.tickets = clientTickets;

        return res.json({ ...client.toJSON(), locations });
    }
    catch (error) {
        next(error);
    }
});

//Get all the Tickets of a Client by clientId
router.get('/:id/tickets', requireAuth, async (req, res, next) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const tickets = await Ticket.findAll({
            where: { clientId: client.id }
        });

        return res.json(tickets);
    } catch (error) {
        next(error);
    }
});

//Get all Locations of a Client by clientId
router.get('/:id/locations', requireAuth, async (req, res, next) => {
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

            const emails = await locationEmail.findAll({
                where: { locationId: location.id }
            });
            location.dataValues.emails = emails;
        }

        return res.json(locations);
    } catch (error) {
        next(error);
    }
});

//Add a Client
router.post('/', requireAuth, singleMulterUpload('image'), async (req, res, next) => {
    try {
        const { firstName, lastName, companyName, email, phone } = req.body;

        const profilePicUrl = req.file
            ? await singleFileUpload({ file: req.file, public: true })
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

        const client = await Client.create({
            firstName,
            lastName,
            companyName,
            email,
            phone,
            profilePicUrl
        });

        return res.json(client);
    } catch (error) {
        next(error);
    }
});

//Add a Location to a Client
router.post('/:id/locations', requireAuth, singleMulterUpload('image'), async (req, res, next) => {
    try {
        const { name, addressLine1, addressLine2, city, state, zipcode } = req.body;

        const client = await Client.findByPk(req.params.id);

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const profilePicUrl = req.file
            ? await singleFileUpload({ file: req.file, public: true })
            : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';

        const location = await Location.create({
            name,
            addressLine1,
            addressLine2,
            city,
            state,
            zipcode,
            clientId: client.id,
            profilePicUrl
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

//Get a Location by locationId for a specific Client
router.get('/:clientId/locations/:locationId', requireAuth, async (req, res, next) => {
    try {
        const { clientId, locationId } = req.params;

        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const location = await Location.findOne({
            where: {
                id: locationId,
                clientId: client.id
            }
        });

        if (!location) {
            return res.status(404).json({ message: 'Location not found for this client' });
        }

        const phoneNumbers = await LocationPhoneNumber.findAll({
            where: { locationId: location.id }
        });
        location.dataValues.phoneNumbers = phoneNumbers;

        const emails = await locationEmail.findAll({
            where: { locationId: location.id }
        });
        location.dataValues.emails = emails;

        return res.json(location);
    } catch (error) {
        next(error);
    }
});

//Edit a Location of a Client
router.put('/:clientId/locations/:locationId', requireAuth, singleMulterUpload('image'), async (req, res, next) => {
    try {
        const { clientId, locationId } = req.params;

        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const location = await Location.findOne({
            where: {
                id: locationId,
                clientId: client.id
            }
        });

        const profilePicUrl = req.file
            ? await singleFileUpload({ file: req.file, public: true })
            : location.profilePicUrl;

        if (!location) {
            return res.status(404).json({ message: 'Location not found for this client' });
        }

        const { name, addressLine1, addressLine2, city, state, zipcode } = req.body;

        location.name = name || location.name;
        location.addressLine1 = addressLine1 || location.addressLine1;
        location.addressLine2 = addressLine2 || location.addressLine2;
        location.city = city || location.city;
        location.state = state || location.state;
        location.zipcode = zipcode || location.zipcode;
        location.profilePicUrl = profilePicUrl;

        await location.save();

        return res.json(location);
    } catch (error) {
        next(error);
    }
});

module.exports = router;