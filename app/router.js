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
    dashboard,
} = require("./controllers");

const router = require("express").Router();

router.get("/", loginRequired, verifyToken, device_pair);
router.get("/login", logoutRequired, login);
router.get("/logout", loginRequired, logoutUser);
router.get("/register", logoutRequired, register);
router.get("/profile", loginRequired, verifyToken, profile);
router.get("/history-temp", loginRequired, verifyToken, history_temp); //Ubah _ jadi - agar mempermudah penulisan di url
router.get("/dashboard/:id", loginRequired, verifyToken, dashboard);

module.exports = router;
