const passport = require('passport');
const User = require('../schema/User');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({usernameField:'id',passwordField:'password'},User.authenticate()));
/* passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); */

passport.serializeUser((user, done)=>{
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
      .then(user => {
          done(null, user);
      })
      .catch(err => {
          done(err, null);
      });
});

module.exports = passport;