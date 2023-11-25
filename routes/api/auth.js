const express = require("express");
const { signup, login, verificationToken } = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:verificationToken", verificationToken);

module.exports = router;
