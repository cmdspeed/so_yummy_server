const { User } = require("../../models");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      status: "error",
      code: 401,
      data: {
        message: "Email or password invalid",
      },
    });
  }
  const passwordCheck = bcrypt.compareSync(password, user.password);

  if (!passwordCheck) {
    return res.status(401).json({
      status: "error",
      code: 401,
      data: {
        message: "Email or password invalid",
      },
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user.id, { token });

  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        userId: user._id,
      },
    },
  });
};

module.exports = login;
