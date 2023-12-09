const express = require("express");
const authenticateJWT = require("../../middleware");
const {
  signup,
  login,
  verificationToken,
  getCurrentUser,
  refresh,
} = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:verificationToken", verificationToken);
router.get("/current", authenticateJWT, getCurrentUser);
router.post("/refresh", refresh);

module.exports = router;
