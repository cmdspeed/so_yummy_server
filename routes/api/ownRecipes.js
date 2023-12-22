const express = require("express");
const { addRecipe } = require("../../controllers/ownRecipe");
const authenticateJWT = require("../../middleware");

const router = express.Router();
router.post("/", authenticateJWT, addRecipe);

module.exports = router;
