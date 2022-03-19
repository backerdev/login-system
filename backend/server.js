const express = require("express");
const userRoute = require("./routers/userRoutes");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use("/api/user", userRoute);

app.listen(port, () => console.log(`app running on port: ${port}`));
