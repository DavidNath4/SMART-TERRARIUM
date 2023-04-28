const {
    loginRequired,
    logoutRequired,
    verifyToken,
} = require("../middleware/userInterfaceAuthentication");
const {
    login,
    register,
    device_pair,
    profile,
    history_temp,
    logoutUser,
} = require("./controllers");

const router = require("express").Router();

router.get("/", loginRequired, verifyToken, device_pair);
router.get("/login", logoutRequired, login);
router.get("/logout", loginRequired, logoutUser);
router.get("/register", logoutRequired, register);
router.get("/profile", loginRequired, verifyToken, profile);
router.get("/history_temp", loginRequired, verifyToken, history_temp);

module.exports = router;
