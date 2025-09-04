const express = require('express');

const {
    Assessment, NetworkInformation, Firewall, Server, 
    AccessPoint, Switch, CCTV, Printer, Scanner,
    IPPhone, Station, NASStation, AudioAmplifier, PaymentTerminal, 
    DentalPracticeInformation, ManagementSoftware, ImagingSoftware, 
    IntraoralSensor, Panoramic, AcquisitionStation, ReconstructionStation
} = require('../../db/models');

const router = express.Router();

//Get All Assessments and all the entities associated with them
router.get('/', async (req, res) => {
    try {
        const assessments = await Promise.all()
        return res.json(assessments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching assessments.' });
    }
});

module.exports = router;