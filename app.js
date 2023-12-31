const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const recipesRouter = require("./routes/api/recipes");
const authRouter = require("./routes/api/auth");
const mainRouter = require("./routes/api/main");
const ownRecipesRouter = require("./routes/api/ownRecipes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipesRouter);
app.use("/api/auth", authRouter);
app.use("/api/main", mainRouter);
app.use("/api/ownRecipies", ownRecipesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
