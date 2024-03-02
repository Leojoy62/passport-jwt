const { validationResult } = require("express-validator");

exports.runValidator = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log("error");
    return res.status(500).send({ errors: result.array() });
  }

  next();
};
