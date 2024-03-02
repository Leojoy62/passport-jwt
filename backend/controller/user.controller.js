const User = require("../model/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.registerController = (req, res) => {
  try {
    console.log(req.body.username);
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        username: req.body.username,
        password: hash,
      });
      await newUser.save();
      res.status(201).json({
        success: true,
        newUser,
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const payload = {
            id: user._id,
            username: user.username,
          };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1d",
          });

          res.status(200).json({
            message: "login success",
            token: "Bearer " + token,
          });
        } else {
          res.status(500).json({
            message: "Password did not match",
          });
        }
      });
    } else {
      res.status(500).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "login faild",
    });
  }
};

exports.profileController = (req, res) => {
  return res.send({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
    },
  });
};
