const express = require('express');

const router = express.Router();

const { requireAuth } = require('@utils/auth');

const { InventoryLocation, PartStock, Part, Stockmovement } = require('@db/models');

// GET /api/inventory/locations
router.get('/locations', async (req, res, next) => {
    try {
        const locations = await InventoryLocation.findAll();

        if (!locations) {
            return res.status(404).json({ error: 'No locations found' });
        }

        return res.json(locations);
    } catch (error) {
        next(error);
    }
});

// POST /api/inventory/locations
// router.post('/locations', controller.createLocation);

// GET /api/inventory/locations/:id/stock
// Get stock of a specific location
// router.get('/locations/:id/stock', controller.getLocationStock);

module.exports = router;