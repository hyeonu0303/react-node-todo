const passport = require('passport');
const User = require('../schema/User');
const KakaoStrategy = require('passport-kakao').Strategy

/**카카오로그인 */
passport.use(new KakaoStrategy({
  clientID : process.env.KAKAO_CLIENT_ID,
  // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
  callbackURL : 'http://localhost:8080/auth/kakao/callback'
},
(accessToken, refreshToken, profile, done) => {
  // 사용자의 정보는 profile에 들어있다.
  console.log(profile)
  User.findOrCreate({
    kakaoId:profile.id,
    kakaoName:profile.username
  }, (err, user) => {
    if (err) { return done(err) }
    return done(null, user)
  })
}
))

module.exports = passport;