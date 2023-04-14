const { index, login } = require("./controllers");

const router = require("express").Router();

router.get("/", index);
router.get("/login", login);

module.exports = router;
