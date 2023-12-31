let router = require('express').Router();
const passport = require('passport');
const User = require('../schema/User');

router.post('/api/register', async (req, res) => {
  console.log('회원가입 데이터:', {
    displayName: req.body.displayName,
    userName: req.body.userName,
    password: req.body.password,
  });
  try{
    const newUser = new User({
      displayName: req.body.displayName,
      userName:req.body.userName
    });
    await User.register(newUser, req.body.password);
    console.log('✅ 회원가입 성공!')
    res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
    passport.authenticate('local')(req,res, function(){
      
    })
  } catch(err){
    console.log('❌ 회원가입 실패!' + err)
    res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.' });
  }
});

router.post('/api/check-id', (req,res)=>{
  console.log(req.body.userName);
  User.findOne({userName:req.body.userName})
    .then((result)=>{
      console.log(result)
      if(result){
        res.json({isDuplicate:true})
      }
      else{
        res.json({isDuplicate:false})
      }
    })
})

router.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return res.status(500).json({ message: '서버 오류', error: err.message });
      }
      if (!user) {
          return res.status(400).json({ message: '아이디또는 비밀번호가 틀립니다' });
      }
      req.logIn(user, (loginErr) => {
          if (loginErr) {
              return res.status(500).json({ message: '로그인 중 오류', error: loginErr.message });
          }
          res.json({ message: '로그인 성공!', user}); //user입력하면 user정보옴
          console.log('✅로그인성공!')
      });
  })(req, res, next);
  console.log(req.body.userName, req.body.password)
});

/**로그아웃 */
router.get("/api/logout", (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({ error: "❗로그인실패" });
    }
    req.session.destroy(function(err) {
      if (err) {
        return res.status(500).json({ error: "❗세션 삭제실패" });
      }
      res.clearCookie('connect.sid');
      res.status(200).json({ message: "✅로그아웃 완료" });
      console.log('✅ 로그아웃 완료')
    });
  });
});

module.exports = router;