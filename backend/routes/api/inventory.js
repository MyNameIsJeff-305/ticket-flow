const express = require('express');

const router = express.Router();

const { requireAuth } = require('@utils/auth');

const { InventoryLocation, PartStock, Part, Stockmovement } = require('@db/models');



module.exports = router;