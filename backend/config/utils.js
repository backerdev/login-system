const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generatePassword = async (pwd) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pwd, salt);
  return hashedPassword;
};
const verifyPassword = async (pwd, user) => {
  console.log(user);
  const valid = await bcrypt.compare(pwd, user.password);
  return valid;
};
const generateToken = async (id) => {
  const refresh_token = jwt.sign({ id }, process.env.REFRESH_TOKEN, {
    expiresIn: "1d",
  });
  const token = jwt.sign({ id }, process.env.ACCESS_TOKEN, {
    expiresIn: "30d",
  });
  await User.findByIdAndUpdate(id, {
    refresh_token: refresh_token,
  });

  return token;
};

module.exports = { generatePassword, verifyPassword, generateToken };
