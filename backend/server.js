const express = require("express");
const userRoute = require("./routers/userRoutes");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db")();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;

app.use("/api/user", userRoute);

app.listen(port, () => console.log(`app running on port: ${port}`));
