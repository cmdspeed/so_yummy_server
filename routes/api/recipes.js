const express = require("express");
const authenticateJWT = require("../../middleware");
const {
  getRecipesByCategory,
  getAllRecipes,
} = require("../../controllers/recipes");

const router = express.Router();

router.get("/", authenticateJWT, getAllRecipes);
router.get("/category/:category", authenticateJWT, getRecipesByCategory);

module.exports = router;
