const express = require("express");
require("./config/db");
require("./config/passport");
// const passport = require("passport");
const cors = require("cors");
// const jwt = require("jsonwebtoken");

const app = express();

const userRouter = require("./rouetes/user.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(passport.initialize());
app.use("/", userRouter);

// app.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),

// );

module.exports = app;
