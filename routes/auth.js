let router = require('express').Router();
const passport = require('passport');

const isLoggined = (req,res,next) => {
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.send('로그인안함')
  }
}

// router.use(isLoggined); //모든라우트에 미들웨어달아줌

router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      const redirectUrl = `http://localhost:5173/?googleName=${user.googleName}`
      res.redirect(redirectUrl);
    });
  })(req, res, next);
});


router.get('/auth/kakao', passport.authenticate('kakao',{failureRedirect:'/fail'}));

router.get('/auth/kakao/callback', (req, res, next) => {
  passport.authenticate('kakao', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      const redirectUrl = `http://localhost:5173/?kakaoName=${user.kakaoName}`
      res.redirect(redirectUrl);
    });
  })(req, res, next);
});

module.exports = router;