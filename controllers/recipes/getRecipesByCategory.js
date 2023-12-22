const { Recipe } = require("../../models");

const getRecipesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    const pageSize = isNaN(parsedLimit) ? 10 : parsedLimit;
    const pageNumber = isNaN(parsedPage) ? 1 : parsedPage;

    const startIndex = (pageNumber - 1) * pageSize;

    const result = await Recipe.find({ category })
      .skip(startIndex)
      .limit(pageSize);

    if (result.length === 0) {
      return res.json({
        status: "not found",
        code: 404,
        data: {
          message: "Category not found!",
        },
      });
    }

    return res.json({
      status: "success",
      code: 200,
      data: {
        recipes: result,
        currentPage: pageNumber,
        totalPages: Math.ceil(result.length / pageSize),
        totalRecipes: result.length,
      },
    });
  } catch (error) {
    console.error("Error in getRecipesByCategory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getRecipesByCategory,
};
