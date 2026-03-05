const express = require('express');

const {
    Assessment, NetworkInformation, Firewall, Server,
    AccessPoint, Switch, CCTV, Printer, Scanner,
    IPPhone, Station, NASStation, AudioAmplifier, PaymentTerminal,
    DentalPracticeInformation, ManagementSoftware, ImagingSoftware,
    IntraoralSensor, Panoramic, AcquisitionStation, ReconstructionStation
} = require('@db/models');

const router = express.Router();

//Get All Assessments and all the entities associated with them
router.get('/', async (req, res) => {
    try {
        const assessments = await Assessment.findAll();
        return res.json(assessments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching assessments.' });
    }
});

//Get a single Assessment by ID
router.get('/:assessmentId', async (req, res) => {
    const { assessmentId } = req.params;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        return res.json(assessment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the assessment.' });
    }
});

//Add an Assessment
router.post('/', async (req, res) => {
    const assessmentData = req.body;
    try {
        const newAssessment = await Assessment.create(assessmentData);
        return res.status(201).json(newAssessment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the assessment.' });
    }
});

//Update an Assessment
router.put('/:assessmentId', async (req, res) => {
    const { assessmentId } = req.params;
    const updatedData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        await assessment.update(updatedData);
        return res.json(assessment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the assessment.' });
    }
});

//Delete an Assessment
router.delete('/:assessmentId', async (req, res) => {
    const { assessmentId } = req.params;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        await assessment.destroy();
        return res.json({ message: 'Assessment deleted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the assessment.' });
    }
});

// Add a NetworkInformation to an Assessment
router.post('/:assessmentId/network-information', async (req, res) => {
    const { assessmentId } = req.params;
    const networkInfoData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newNetworkInfo = await NetworkInformation.create({
            ...networkInfoData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newNetworkInfo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding network information.' });
    }
});

// Add a Firewall to an Assessment
router.post('/:assessmentId/firewalls', async (req, res) => {
    const { assessmentId } = req.params;
    const firewallData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newFirewall = await Firewall.create({
            ...firewallData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newFirewall);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding firewall.' });
    }
});

// Add a Server to an Assessment
router.post('/:assessmentId/servers', async (req, res) => {
    const { assessmentId } = req.params;
    const serverData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newServer = await Server.create({
            ...serverData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newServer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding server.' });
    }
});

// Add an AccessPoint to an Assessment
router.post('/:assessmentId/access-points', async (req, res) => {
    const { assessmentId } = req.params;
    const accessPointData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newAccessPoint = await AccessPoint.create({
            ...accessPointData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newAccessPoint);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding access point.' });
    }
});

// Add a Switch to an Assessment
router.post('/:assessmentId/switches', async (req, res) => {
    const { assessmentId } = req.params;
    const switchData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newSwitch = await Switch.create({
            ...switchData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newSwitch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding switch.' });
    }
});

// Add a CCTV to an Assessment
router.post('/:assessmentId/cctvs', async (req, res) => {
    const { assessmentId } = req.params;
    const cctvData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newCCTV = await CCTV.create({
            ...cctvData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newCCTV);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding CCTV.' });
    }
});

// Add a Printer to an Assessment
router.post('/:assessmentId/printers', async (req, res) => {
    const { assessmentId } = req.params;
    const printerData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newPrinter = await Printer.create({
            ...printerData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newPrinter);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding printer.' });
    }
});

// Add a Scanner to an Assessment
router.post('/:assessmentId/scanners', async (req, res) => {
    const { assessmentId } = req.params;
    const scannerData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newScanner = await Scanner.create({
            ...scannerData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newScanner);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding scanner.' });
    }
});

// Add an IPPhone to an Assessment
router.post('/:assessmentId/ip-phones', async (req, res) => {
    const { assessmentId } = req.params;
    const ipPhoneData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newIPPhone = await IPPhone.create({
            ...ipPhoneData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newIPPhone);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding IP phone.' });
    }
});

// Add a Station to an Assessment
router.post('/:assessmentId/stations', async (req, res) => {
    const { assessmentId } = req.params;
    const stationData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newStation = await Station.create({
            ...stationData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newStation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding station.' });
    }
});

// Add a NASStation to an Assessment
router.post('/:assessmentId/nas-stations', async (req, res) => {
    const { assessmentId } = req.params;
    const nasStationData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newNASStation = await NASStation.create({
            ...nasStationData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newNASStation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding NAS station.' });
    }
});

// Add an AudioAmplifier to an Assessment
router.post('/:assessmentId/audio-amplifiers', async (req, res) => {
    const { assessmentId } = req.params;
    const audioAmplifierData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newAudioAmplifier = await AudioAmplifier.create({
            ...audioAmplifierData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newAudioAmplifier);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding audio amplifier.' });
    }
});

// Add a PaymentTerminal to an Assessment
router.post('/:assessmentId/payment-terminals', async (req, res) => {
    const { assessmentId } = req.params;
    const paymentTerminalData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newPaymentTerminal = await PaymentTerminal.create({
            ...paymentTerminalData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newPaymentTerminal);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding payment terminal.' });
    }
});

// Add a DentalPracticeInformation to an Assessment
router.post('/:assessmentId/dental-practice-information', async (req, res) => {
    const { assessmentId } = req.params;
    const dentalPracticeInfoData = req.body;
    try {
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        const newDentalPracticeInfo = await DentalPracticeInformation.create({
            ...dentalPracticeInfoData,
            AssessmentId: assessmentId
        });
        return res.status(201).json(newDentalPracticeInfo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding dental practice information.' });
    }
});

// Add a ManagementSoftware to a DentalPracticeInformation
router.post('/:assessmentId/dental-practice-information/:dentalPracticeInformationId/management-software', async (req, res) => {
    const { assessmentId, dentalPracticeInformationId } = req.params;
    const managementSoftwareData = req.body;
    try {
        const dentalPracticeInfo = await DentalPracticeInformation.findOne({
            where: {
                id: dentalPracticeInformationId,
                AssessmentId: assessmentId
            }
        });
        if (!dentalPracticeInfo) {
            return res.status(404).json({ error: 'Dental Practice Information not found for this assessment.' });
        }
        const newManagementSoftware = await ManagementSoftware.create({
            ...managementSoftwareData,
            DentalPracticeInformationId: dentalPracticeInformationId
        });
        return res.status(201).json(newManagementSoftware);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding management software.' });
    }
});

// Add an ImagingSoftware to a DentalPracticeInformation
router.post('/:assessmentId/dental-practice-information/:dentalPracticeInformationId/imaging-software', async (req, res) => {
    const { assessmentId, dentalPracticeInformationId } = req.params;
    const imagingSoftwareData = req.body;
    try {
        const dentalPracticeInfo = await DentalPracticeInformation.findOne({
            where: {
                id: dentalPracticeInformationId,
                AssessmentId: assessmentId
            }
        });
        if (!dentalPracticeInfo) {
            return res.status(404).json({ error: 'Dental Practice Information not found for this assessment.' });
        }
        const newImagingSoftware = await ImagingSoftware.create({
            ...imagingSoftwareData,
            DentalPracticeInformationId: dentalPracticeInformationId
        });
        return res.status(201).json(newImagingSoftware);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding imaging software.' });
    }
});

// Add an IntraoralSensor to a DentalPracticeInformation
router.post('/:assessmentId/dental-practice-information/:dentalPracticeInformationId/intraoral-sensors', async (req, res) => {
    const { assessmentId, dentalPracticeInformationId } = req.params;
    const intraoralSensorData = req.body;
    try {
        const dentalPracticeInfo = await DentalPracticeInformation.findOne({
            where: {
                id: dentalPracticeInformationId,
                AssessmentId: assessmentId
            }
        });
        if (!dentalPracticeInfo) {
            return res.status(404).json({ error: 'Dental Practice Information not found for this assessment.' });
        }
        const newIntraoralSensor = await IntraoralSensor.create({
            ...intraoralSensorData,
            DentalPracticeInformationId: dentalPracticeInformationId
        });
        return res.status(201).json(newIntraoralSensor);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding intraoral sensor.' });
    }
});

// Add a Panoramic to a DentalPracticeInformation
router.post('/:assessmentId/dental-practice-information/:dentalPracticeInformationId/panoramics', async (req, res) => {
    const { assessmentId, dentalPracticeInformationId } = req.params;
    const panoramicData = req.body;
    try {
        const dentalPracticeInfo = await DentalPracticeInformation.findOne({
            where: {
                id: dentalPracticeInformationId,
                AssessmentId: assessmentId
            }
        });
        if (!dentalPracticeInfo) {
            return res.status(404).json({ error: 'Dental Practice Information not found for this assessment.' });
        }
        const newPanoramic = await Panoramic.create({
            ...panoramicData,
            DentalPracticeInformationId: dentalPracticeInformationId
        });
        return res.status(201).json(newPanoramic);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding panoramic.' });
    }
});

// Add an AcquisitionStation to a DentalPracticeInformation
router.post('/:assessmentId/dental-practice-information/:dentalPracticeInformationId/acquisition-stations', async (req, res) => {
    const { assessmentId, dentalPracticeInformationId } = req.params;
    const acquisitionStationData = req.body;
    try {
        const dentalPracticeInfo = await DentalPracticeInformation.findOne({
            where: {
                id: dentalPracticeInformationId,
                AssessmentId: assessmentId
            }
        });
        if (!dentalPracticeInfo) {
            return res.status(404).json({ error: 'Dental Practice Information not found for this assessment.' });
        }
        const newAcquisitionStation = await AcquisitionStation.create({
            ...acquisitionStationData,
            DentalPracticeInformationId: dentalPracticeInformationId
        });
        return res.status(201).json(newAcquisitionStation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding acquisition station.' });
    }
});

router.post('/create-assessment-in-freshservice', async (req, res) => {
    const info= req.body;

    console.log( 'Creating assessment in Freshservice with info:', info );

    // Placeholder response
    return res.status(201).json({ message: 'Assessment creation in Freshservice is not yet implemented.' });
});

module.exports = router;