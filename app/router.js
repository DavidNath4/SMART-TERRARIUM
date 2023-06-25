const { isTokenValid } = require("../middleware/authentication");
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
    history_humd,
    history_uv,
    history_drink,
    history_food,
    logoutUser,
    dashboard,
    schedule,
    forgotPass,
    resetPass
} = require("./controllers");

const router = require("express").Router();

router.get("/", loginRequired, verifyToken, device_pair);
router.get("/login", logoutRequired, login);
router.get("/forgot-password", logoutRequired, forgotPass);
router.get("/reset-password/:token", logoutRequired, isTokenValid, resetPass);
router.get("/logout", loginRequired, logoutUser);
router.get("/register", logoutRequired, register);
router.get("/profile", loginRequired, verifyToken, profile);
router.get("/dashboard/:id/history-temp", loginRequired, verifyToken, history_temp);
router.get("/dashboard/:id/history-humd", loginRequired, verifyToken, history_humd);
router.get("/dashboard/:id/history-uv", loginRequired, verifyToken, history_uv);
router.get("/dashboard/:id/history-drink", loginRequired, verifyToken, history_drink);
router.get("/dashboard/:id/history-food", loginRequired, verifyToken, history_food);
router.get("/dashboard/:id", loginRequired, verifyToken, dashboard);
router.get("/dashboard/:id/schedule", loginRequired, verifyToken, schedule);

module.exports = router;
