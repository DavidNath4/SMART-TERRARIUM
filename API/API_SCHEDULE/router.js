const router = require('express').Router();
const { verifyToken } = require('../../middleware/authentication');
const publish = require('./controller');

router.put('/publish/:deviceID', verifyToken, publish.publishSchedule);

module.exports = router;