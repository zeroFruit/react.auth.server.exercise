const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localLoginStrategyOptions = {
  usernameField: 'email'
}

const localLoginStrategy = new LocalStrategy(localLoginStrategyOptions, (email, password, done) => {
  User.findOne({ email }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      done(null, user);
    })
  })
});

const jwtLoginStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLoginStrategy = new JwtStrategy(jwtLoginStrategyOptions, (decodedJwtToken, done) => {
  User.findById(decodedJwtToken.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLoginStrategy);
passport.use(localLoginStrategy);
