const express = require("express");
const userRouter = require("../SMART-TERRARIUM/API_USER/router");
const deviceRouter = require("../SMART-TERRARIUM/API_DEVICE/router");
const historyRouter = require('../SMART-TERRARIUM/API_HISTORY/router');
const scheduleRouter = require('../SMART-TERRARIUM/API_SCHEDULE/router');
const router = express.Router();

router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/history", historyRouter);
router.use("/schedule", scheduleRouter);


module.exports = router;