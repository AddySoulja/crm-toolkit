const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const JwtStrategy = require("passport-jwt").Strategy;

const jwtOptions = {
  jwtFromRequest: function (req) {
    let token = null;
    if (req && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1].split("=")[1];
    }
    return token;
  },
  secretOrKey: process.env.KEY,
};
const configPassportJwt = (passport) => {
  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId);
        if (!user) return done("User not found!", false);
        return done(false, {
          _id: user._id,
          username: user.username,
          email: user.email,
          photo: user.photo,
          token: generateToken(user._id),
        });
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

module.exports = configPassportJwt;
