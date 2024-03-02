const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/passportJWTDB")
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("DB Connection Failed");
  });
