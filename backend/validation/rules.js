const { check } = require("express-validator");

exports.registerValidator = [
  check("username").trim().notEmpty().isLength({ max: 20 }),
  check("password").trim().notEmpty().isLength({ min: 6 }),
];
