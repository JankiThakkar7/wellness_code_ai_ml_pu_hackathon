require("dotenv").config();
const passport = require("passport");
const { User } = require("../models/user");
const router = require("express").Router();

router.get(
  "/api/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: true,
  })
);

router.get("/api/login/success", async (req, res) => {
  const user = await User.findOne({ email: req.user?.emails[0]?.value });
  if (user) {
    const { role, email } = user;
    res.status(200).json({
      success: true,
      message: "Log in successfully",
      image: req.user?.photos[0]?.value,
      name: req.user?.displayName,
      email,
      role,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Not Logged In",
    });
  }
});

router.get("/api/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Login Failed",
  });
});

router.get("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_HOME);
  });
});

router.get(
  "/callback",
  passport.authenticate("google", {
    session: true,
    successRedirect: process.env.CLIENT_HOME,
    failureRedirect: "/api/login",
  })
);

module.exports = router;
