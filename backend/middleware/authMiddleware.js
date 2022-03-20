const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.ACCESS_TOKEN);

      req.user = await User.findById(decode.id).select("-password");
      console.log(req.user);
      next();
    } catch (error) {}
  }
  if (!token) {
    res.status(401).json({ message: "Not authorised" });
  }
};

module.exports = authMiddleware;
