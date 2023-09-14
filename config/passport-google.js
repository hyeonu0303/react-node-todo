const passport = require('passport'); //passport lib
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../schema/User');
/**구글로그인 */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
},

function(accessToken, refreshToken, profile, cb) {
  console.log("accessToken:", accessToken);
  console.log("refreshToken:", refreshToken);
  console.log("profile:", profile);
  User.findOrCreate({ 
    googleId: profile.id, 
    googleName: profile.displayName,
    googleEmail: profile.emails[0].value
  }, function (err, user) {
    return cb(err, user);
  });
}
));

module.exports = passport;