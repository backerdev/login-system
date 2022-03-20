const {
  generatePassword,
  verifyPassword,
  generateToken,
} = require("../config/utils");

const User = require("../models/userModel");

const register = async (req, res) => {
  const { name, email, password, cpassword, secret } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  if (password !== cpassword) {
    return res.status(400).json({ message: "password does not match" });
  }
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ message: "user already exist" });
  }
  const hashedpassword = await generatePassword(password);
  const newUser = await User.create({
    name: name,
    refresh_token: "",
    password: hashedpassword,
    email: email,
  });

  res.send(newUser);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "please fill in all fields" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "no user found" });
  }
  const verified = await verifyPassword(password, user);
  if (!verified) {
    return res.status(401).json({ message: "password not match" });
  }
  if (verified) {
    const accessToken = await generateToken(user?._id);
    res.status(200).json({ accessToken });
  }
};
const profile = async (req, res) => {
  res.send(req.user);
};

module.exports = {
  register,
  login,
  profile,
};
