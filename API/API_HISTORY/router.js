const router = require('express').Router();
const { verifyToken } = require('../../middleware/authentication');
const history = require('./controller');

router.get('/temp/:id', history.temperatureLog);
router.get('/humd/:id', history.humidityLog);
router.get('/uv/:id', history.uvLog);
router.get('/drink/:id', history.drinkLog);
router.get('/food/:id', history.foodLog);


module.exports = router;