const router = require('express').Router();

router.use('/twilio', require('./twilio').router);

module.exports = router;