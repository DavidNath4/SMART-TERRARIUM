const express = require("express");
const userRouter = require("./API/API_USER/router");
const deviceRouter = require("./API/API_DEVICE/router");
const historyRouter = require('./API/API_HISTORY/router');
const scheduleRouter = require('./API/API_SCHEDULE/router');
const router = express.Router();

router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/history", historyRouter);
router.use("/schedule", scheduleRouter);


module.exports = router;