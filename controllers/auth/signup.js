const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const randomToken = require("random-token");

const { GMAIL_USER, GMAIL_KEY } = process.env;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_KEY,
  },
});

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

    await User.create({
      name,
      email,
      password: hashPassword,
      verificationToken: randomToken(16),
    });
    const newUser = await User.findOne({ email });

    const mailOptions = {
      from: "learn2313@gmail.com",
      to: newUser.email,
      subject: `Verification email`,
      text: `please verify your email address: http://localhost:3001/api/auth/verify/${newUser.verificationToken} best regards, Kamil ;) `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
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
