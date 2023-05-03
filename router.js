const express = require("express");
const userRouter = require("./API/API_USER/router");
const deviceRouter = require("./API/API_DEVICE/router");
const historyRouter = require("./API/API_HISTORY/router");
const scheduleRouter = require("./API/API_SCHEDULE/router");
const app = require("./app/router");
const router = express.Router();

// router.get("/socket.io/socket.io.js", (req, res) => {
//     res.sendFile(__dirname + "/node_modules/socket.io/client-dist/socket.io.js");
// });
router.use("/", app);
router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/history", historyRouter);
router.use("/schedule", scheduleRouter);

module.exports = router;
