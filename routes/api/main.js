const express = require("express");
const { main } = require("../../controllers/main");
const authenticateJWT = require("../../middleware");

const router = express.Router();

router.get("/", authenticateJWT, main);

module.exports = router;
