const {
    index,
    login,
    register,
    device_pair,
    historyTemp,
    profile,
    history_temp,
} = require("./controllers");

const router = require("express").Router();

router.get("/", device_pair);
router.get("/login", login);
router.get("/register", register);
router.get("/profile", profile);
router.get("/history_temp", history_temp);

module.exports = router;
