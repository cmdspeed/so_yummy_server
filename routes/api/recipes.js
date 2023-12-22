const express = require("express");
const authenticateJWT = require("../../middleware");
const { getRecipesByCategory } = require("../../controllers/recipes");

const router = express.Router();

// router.get("/", authenticateJWT, getRecipesByCategory);
router.get("/category/:category", authenticateJWT, getRecipesByCategory);

module.exports = router;
