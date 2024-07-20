const { User } = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOLGE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URI,
    },
    async (accessToken, refreshToken, profile, cb) => {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        cb(null, profile);
      } else {
        user = await User.create({
          email: profile.emails[0].value,
          role: process.env.ROLE,
        });
        cb(null, profile);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
