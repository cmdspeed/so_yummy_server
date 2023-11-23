const express = require("express");
const { auth } = require("../../controllers/auth");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { name, email, password } = req.body;
  res.json({ message: ` ${name} ${email} ${password}` });
});

module.exports = router;
