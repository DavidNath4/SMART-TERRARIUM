const router = require('express').Router();
const { verifyToken } = require('../../middleware/authentication');
const { deviceIdPinChecker, isDevicePaired } = require('../../middleware/deviceChecker');
const device = require('./controller');

router.get('/initialization', device.device_init);

router.post('/pair',
    verifyToken,
    deviceIdPinChecker,
    isDevicePaired,
    device.device_pair);

router.get("/devices", device.devices);

router.get('/devices/:id', device.device_get);

router.get("/unpair/:id", device.device_unpair);

router.put("/rename/:id", device.device_rename);

router.get('/status/:id', device.device_status);

module.exports = router;