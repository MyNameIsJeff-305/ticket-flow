const express = require('express');

const { Location, LocationPhoneNumber } = require('@db/models');

const router = express.Router();

//Get All Locations
router.get('/', async (req, res, next) => {
    try {
        const locations = await Location.findAll();
        return res.json(locations);
    } catch (error) {
        next(error);
    }
});

//Get a Location Based on ID
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const location = await Location.findByPk(id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        const phoneNumbers = await LocationPhoneNumber.findAll({
            where: { locationId: location.id }
        });

        return res.json({ ...location.toJSON(), phoneNumbers });
    } catch (error) {
        next(error);
    }
});

//Add a Phone Number to a Location
router.post('/:locationId/phone-numbers', async (req, res, next) => {
    const { locationId } = req.params;
    const { phoneNumber, phoneType } = req.body;

    try {
        const location = await Location.findByPk(locationId);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        const newPhoneNumber = await LocationPhoneNumber.create({
            locationId,
            phoneNumber,
            phoneType
        });

        return res.status(201).json(newPhoneNumber);
    } catch (error) {
        next(error);
    }
});

//Remove a Phone Number of a Location
router.delete('/:locationId/phone-numbers/:phoneNumberId', async (req, res, next) => {
    const { locationId, phoneNumberId } = req.params;

    try {
        const location = await Location.findByPk(locationId);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        const phoneNumber = await LocationPhoneNumber.findByPk(phoneNumberId);
        if (!phoneNumber) {
            return res.status(404).json({ message: 'Phone number not found' });
        }

        await phoneNumber.destroy();

        return res.status(200).json({ message: 'Phone number removed from location' });
    } catch (error) {
        next(error);
    }
});

//Edit a Location by ID
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, addressLine1, addressLine2, city, state, zipcode } = req.body;

    try {
        const location = await Location.findByPk(id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        location.name = name || location.name;
        location.addressLine1 = addressLine1 || location.addressLine1;
        location.addressLine2 = addressLine2 || location.addressLine2;
        location.city = city || location.city;
        location.state = state || location.state;
        location.zipcode = zipcode || location.zipcode;

        await location.save();

        return res.json(location);
    } catch (error) {
        next(error);
    }
});

module.exports = router;