const { index, login, register, device_pair } = require("./controllers");

const router = require("express").Router();

router.get("/", index);
router.get("/login", login);
router.get("/register", register);
router.get("/device_pair", device_pair);


module.exports = router;