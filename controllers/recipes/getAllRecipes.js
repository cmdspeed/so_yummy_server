const { Recipe } = require("../../models");

const getAllRecipes = async (req, res) => {
  try {
    const categories = await Recipe.distinct("category");

    const result = [];

    for (const category of categories) {
      const recipesInCategory = await Recipe.find({ category }).limit(4).lean();

      result.push({
        category,
        recipes: recipesInCategory,
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        categories: result,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllRecipes };
