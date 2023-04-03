const router = require('express').Router();
const { verifyToken } = require('../middleware/authentication');
const history = require('./controller');

router.get('/:id', history.deviceLog);

module.exports = router;