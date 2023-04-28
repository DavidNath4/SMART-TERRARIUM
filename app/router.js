const {
    login,
    register,
    device_pair,
    profile,
    history_temp,
    logoutUser,
} = require("./controllers");

const router = require("express").Router();

router.get("/", device_pair);
router.get("/login", login);
router.get("/logout", logoutUser);
router.get("/register", register);
router.get("/profile", profile);
router.get("/history_temp", history_temp);

module.exports = router;
