const user = require("./controller");
const { body, query, param } = require("express-validator");
const {
    isUsernameExist,
    isUsernameAvailable,
} = require("../../middleware/usernameChecker");
const { isPasswordConfirmed } = require("../../middleware/passwordChecker");
const {
    isEmailExist,
    isEmailExist2,
    isEmailAvailable,
} = require("../../middleware/emailChecker");
const { formChecker } = require("../../middleware/formChecker");
const {
    verifyToken,
    loginRequired,
    logoutRequired,
    checkSession,
    isTokenValid,
} = require("../../middleware/authentication");

const router = require("express").Router();

router.post(
    "/register",
    body("username")
        .isLength({ min: 6 })
        .withMessage("Username minimum is 6 character"),
    body("email").isEmail().withMessage("Please enter valid email"),
    body("password")
        .isStrongPassword()
        .withMessage(
            "Password must have at least 8 characters, have a combination of numbers, uppercase, lowercase letters and unique characters"
        ),
    formChecker,
    isUsernameExist,
    isEmailExist,
    isPasswordConfirmed,
    user.registerUser
);

router.post("/login", logoutRequired, user.loginUser);

router.get("/logout", loginRequired, user.logoutUser);

router.get("/session", verifyToken, user.detail);

router.post(
    "/update",
    verifyToken,
    body("username")
        .isLength({ min: 6 })
        .withMessage("Username minimum is 6 character"),
    body("email").isEmail().withMessage("Please enter valid email"),
    body("password")
        .isStrongPassword()
        .withMessage(
            "Password must have at least 8 characters, have a combination of numbers, uppercase, lowercase letters and unique characters"
        ),
    formChecker,
    isUsernameAvailable,
    isEmailAvailable,
    isPasswordConfirmed,
    user.updateUser
);

router.post(
    "/updateOnly",
    verifyToken,
    body("username")
        .isLength({ min: 6 })
        .withMessage("Username minimum is 6 character"),
    body("email").isEmail().withMessage("Please enter valid email"),
    formChecker,
    isUsernameAvailable,
    isEmailAvailable,
    user.updateUserOnly
);

router.post("/forgot-password", logoutRequired, isEmailExist2, user.forgotPassword);

router.post("/reset-password", logoutRequired, isTokenValid,
    body("password")
        .isStrongPassword()
        .withMessage(
            "Password must have at least 8 characters, have a combination of numbers, uppercase, lowercase letters and unique characters"
        ),
    formChecker,
    isPasswordConfirmed,
    user.resetPassword);

module.exports = router;
