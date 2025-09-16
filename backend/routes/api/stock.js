const express = require('express');

const router = express.Router();

const { requireAuth } = require('@utils/auth');

const { PartStock, Part, InventoryLocation, StockMovement } = require('@db/models');

// GET /api/stock
// Get all the Stock per Location
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const result = [];

        const locations = await InventoryLocation.findAll();

        if(!locations || locations.length === 0) {
            return res.status(404).json({ error: 'No inventory locations found' });
        }

        for (const location of locations) {
            const stock = await PartStock.findAll({
                where: { inventoryLocationId: location.id },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [Part]
            })

            const safeStock = stock.map(item => ({
                id: item.partId,
                sku: item.Part.sku,
                name: item.Part.name,
                description: item.Part.description,
                quantity: item.quantity,
                minThreshold: item.minThreshold
            }))

            result.push({
                id: location.id,
                name: location.name,
                stock: safeStock
            })
        }

        return res.json(result);

    } catch (error) {
        next(error);
    }
});

// GET /api/stock/movements
// Get stock movements (history)
router.get('/movements', requireAuth, async (req, res, next) => {
    try {
        const movements = await StockMovement.findAll({
            include: [Part, InventoryLocation],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return res.json(movements);
    } catch (error) {
        next(error);
    }
});

// POST /api/stock/restock
// Increase stock manually
router.post('/restock', requireAuth, async (req, res, next) => {
    try {
        const { partId, locationId, quantity } = req.body;
        const stock = await PartStock.findOne({ where: { partId, inventoryLocationId: locationId } });
        if (stock) {
            //quantity cannot be negative after restock
            if(stock.quantity + quantity < 0) {
                return res.status(400).json({ error: 'Resulting stock quantity cannot be negative' });
            }
            await StockMovement.create({
                partId,
                inventoryLocationId: locationId,
                quantity,
                type: quantity >= 0 ? 'in' : 'out',
                sourceType: 'Manual Restock',
                sourceId: 401,
                employeeId: req.user.id
            });
            stock.quantity += quantity;
            await stock.save();
            return res.json(stock);
        } else {
            return res.status(404).json({ error: 'Stock not found' });
        }
    } catch (error) {
        next(error);
    }
});

// POST /api/stock/adjust
// Adjust inventory (e.g. correction)
router.post('/adjust', requireAuth, async (req, res, next) => {
    try {
        const { partId, locationId, quantity } = req.body;
        const stock = await PartStock.findOne({ where: { partId, inventoryLocationId: locationId } });
        if (stock) {
            stock.quantity = quantity;
            await stock.save();
            await StockMovement.create({
                partId,
                inventoryLocationId: locationId,
                quantity: quantity - stock.quantity,
                type: quantity >= stock.quantity ? 'in' : 'out',
                sourceType: 'Manual Adjustment',
                sourceId: null,
                employeeId: req.user.id
            });
            return res.json(stock);
        } else {
            return res.status(404).json({ error: 'Stock not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;