const { User } = require("../../models");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    await User.create({ name, email, password });
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
