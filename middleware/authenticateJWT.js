const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "").trim();

  if (!token) {
    return res.status(401).json({ message: "Brak tokenu autoryzacyjnego" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Błąd autoryzacji" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
