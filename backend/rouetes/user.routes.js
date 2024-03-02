const {
  registerController,
  loginController,
  profileController,
} = require("../controller/user.controller");
const { registerValidator } = require("../validation/rules");
const { runValidator } = require("../validation/runValidator");
const router = require("express").Router();
const passport = require("passport");
router.use(passport.initialize());

router.post("/register", registerValidator, runValidator, registerController);

router.post("/login", loginController);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileController
);

module.exports = router;
