const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 3,
      required: [true, "title is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    cookingTime: {
      type: String,
      required: [true, "cookingTime is required"],
    },
    ingredients: {
      type: String,
      required: [false, "ingredients"],
    },

    description: {
      type: String,
      required: [false, "description"],
    },
    image: {
      type: String,
      required: [false, "add photo"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Recipe = model("recipe", recipeSchema);

module.exports = Recipe;
