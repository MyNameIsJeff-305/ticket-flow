const express = require('express');

const { Part } = require('@db/models');
const { requireAuth } = require('@utils/auth');
const { singleFileUpload } = require('@backend/awsS3');


const router = express.Router();

// GET /api/parts
// List all parts
router.get('/', requireAuth, async (req, res) => {
    try {
        const parts = await Part.findAll();

        if (!parts) {
            return res.status(404).json({ error: 'No parts found' });
        }

        return res.json(parts);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error fetching parts' });
    }
});

// GET /api/parts/:id
// Get Details of a specific Part
router.get('/:id', requireAuth, async (req, res) => {
    try {
        const part = await Part.findByPk(req.params.id);
        if (!part) {
            return res.status(404).json({ error: 'Part not found' });
        }
        return res.json(part);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching part' });
    }
});

// POST /api/parts
// Create a new Part
router.post('/', requireAuth, async (req, res, next) => {
    try {
        const { sku, name, description, brand, model, imageUrl, unit, defaultPrice, active } = req.body;

        // Upload image to S3 if provided
        let finalImageUrl = imageUrl;
        if (req.file) {
            finalImageUrl = await singleFileUpload({ file: req.file, public: true });
        }

        // Create part
        const newPart = await Part.create({ sku, name, description, brand, model, imageUrl: finalImageUrl, unit, defaultPrice, active });
        return res.status(201).json(newPart);
    } catch (error) {
        return next(error);
    }
});

// PUT /api/parts/:id
// Update Part
router.put('/:id', requireAuth, async (req, res, next) => {
    try {
        const { name, description, brand, model, imageUrl, unit, defaultPrice, active } = req.body;
        const part = await Part.findByPk(req.params.id);
        if (!part) {
            return res.status(404).json({ error: 'Part not found' });
        }

        // Upload image to S3 if provided
        let finalImageUrl = imageUrl;
        if (req.file) {
            finalImageUrl = await singleFileUpload({ file: req.file, public: true });
        }

        await part.update({ name, description, brand, model, imageUrl: finalImageUrl, unit, defaultPrice, active });
        return res.json(part);
    } catch (error) {
        return next(error);
    }
});

// DELETE /api/parts/:id
// Delete Part
router.delete('/:id', requireAuth, async (req, res, next) => {
    try {
        const part = await Part.findByPk(req.params.id);
        if (!part) {
            return res.status(404).json({ error: 'Part not found' });
        }
        await part.destroy();
        return res.status(204).json({ message: 'Part deleted' });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;