const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        data: {
          message: "user already exists",
        },
      });
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await User.create({ name, email, password: hashPassword });
    const newUser = await User.findOne({ email });
    await newUser.save();
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          name,
          email,
          avatar: newUser.avatar,
          userId: newUser._id,
        },
      },
    });
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = signup;
