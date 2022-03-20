const express = require("express");

const { register, login, profile } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/profile", protect, profile);

module.exports = route;
