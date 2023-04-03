const router = require('express').Router();
const publish = require('./controller');

router.put('/publish/:id', publish.publishSchedule);

module.exports = router;