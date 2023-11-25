const { User } = require("../../models");

const verificationToken = async (req, res) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({
        status: "not found",
        code: 404,
        data: {
          message: "verificationToken not found or expired",
        },
      });
    }

    user.verify = true;
    user.verificationToken = null;
    await user.save();

    return res.status(200).json({
      status: "successful",
      code: 200,
      data: {
        message: "Verification successful",
      },
    });
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = verificationToken;
