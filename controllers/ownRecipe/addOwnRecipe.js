const { Recipe } = require("../../models");

const addRecipe = async (req, res) => {
  try {
    const { title, category, cookingTime, ingredients, description } = req.body;

    if (!title || !category || !cookingTime) {
      return res.status(400).json({
        error: "Title, category, and cooking time are required fields.",
      });
    }
    const image =
      "https://images.pexels.com/photos/4033165/pexels-photo-4033165.jpeg";

    const newRecipe = new Recipe({
      title,
      category,
      cookingTime,
      ingredients: ingredients || "",
      description: description || "",
      image,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addRecipe };
