const express = require('express');

const { Status } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

//Get all Statuses
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const statuses = await Status.findAll();

        return res.json(statuses);

    } catch (error) {
        next(error);
    }
});

//Add a new Status
router.post('/', requireAuth, async (req, res, next) => {
    try {
        const { name, color, description } = req.body;

        const status = await Status.create({
            name,
            color,
            description
        });

        return res.json(status);

    } catch (error) {
        next(error);
    }
});

//Edit a Status
router.put('/:id', requireAuth, async (req, res, next) => {
    try {
        const status = await Status.findByPk(req.params.id);

        const { name, color, description } = req.body;

        status.name = name || status.name;
        status.color = color || status.color;
        status.description = description || status.description;

        await status.save();

        return res.json(status);

    } catch (error) {
        next(error);
    }
});

//Delete a Status
router.delete('/:id', requireAuth, async (req, res, next) => {
    try {
        const status = await Status.findByPk(req.params.id);

        if (!status) {
            return res.status(404).json({ message: 'Status not found' });
        }

        await status.destroy();

        return res.json({ message: 'Status Deleted' });

    } catch (error) {
        next(error);
    }
});

module.exports = router;