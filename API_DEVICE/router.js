const router = require('express').Router();
const { verifyToken } = require('../middleware/authentication');
const { deviceIdPinChecker, isDevicePaired } = require('../middleware/deviceChecker');
const device = require('./controller');

router.get('/initialization', device.device_init);
router.post('/pair',
    verifyToken,
    deviceIdPinChecker,
    isDevicePaired,
    device.device_pair);

router.get("/devices", device.devices);

module.exports = router;