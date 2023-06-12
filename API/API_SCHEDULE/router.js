const router = require('express').Router();
const { formatSchedule } = require('../../middleware/scheduleChecker');
const publish = require('./controller');

// router.put('/publish/:deviceID', formatSchedule, publish.publishSchedule);
router.put('/publish/:deviceID', publish.publishSchedule);

module.exports = router;