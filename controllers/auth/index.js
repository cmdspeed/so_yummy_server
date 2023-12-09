const login = require("./login");
const signup = require("./signup");
const verificationToken = require("./verificationToken");
const getCurrentUser = require("./current");
const refresh = require("./refresh");

module.exports = {
  login,
  signup,
  verificationToken,
  getCurrentUser,
  refresh,
};
