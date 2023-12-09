const main = async (req, res) => {
  console.log(req.user);
  res.json({ message: "Strona główna" });
};

module.exports = main;
