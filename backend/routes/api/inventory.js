const express = require('express');

const router = express.Router();

const { requireAuth } = require('@utils/auth');

const { InventoryLocation, PartStock, Part, Stockmovement } = require('@db/models');

// GET /api/inventory/locations
router.get('/locations', requireAuth, async (req, res, next) => {
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
router.post('/locations', requireAuth, async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const newLocation = await InventoryLocation.create({ name, description });
        return res.status(201).json(newLocation);
    } catch (error) {
        next(error);
    }
});

// GET /api/inventory/locations/:locationId/stock
// Get stock of a specific location
router.get('/locations/:locationId/stock', requireAuth, async (req, res, next) => {
    try {
        const { locationId } = req.params;
        
        const stock = await PartStock.findAll({
            where: { inventoryLocationId: locationId },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [Part]
        });

        if (!stock) {
            return res.status(404).json({ error: 'No stock found for this location' });
        }

        return res.json(stock);
    } catch (error) {
        next(error);
    }
});

module.exports = router;