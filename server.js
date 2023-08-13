require('dotenv').config();
const mongoUrl = process.env.MONGODB_URI;
const secret_key = process.env.SECRET_KEY;
const port = process.env.PORT;

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

const User = require('./schema/User');

const app = express();

app.use(express.json());
app.use(cors({credentials: true}));
app.use(express.urlencoded({extended: true})) 

app.listen(port, function () {
  console.log(`🚀 Server On ${port}port`)
}); 

app.use(session({
  secret: secret_key,
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({usernameField:'email',passwordField:'password'},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB 연결성공');
}).catch(err => {
  console.error('❌ MongoDB 연결실패:', err.message);
});
/**로그인 확인하기위한 미들웨어 */
const isLoggined = (req,res,next) => {
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.send('로그인안함')
  }
}


app.post('/api/register', async (req, res) => {
  console.log('회원가입 데이터:', {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  
  // 나머지 회원가입 로직
  try{
    const newUser = new User({
      username:req.body.userName,
      email: req.body.email
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

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return res.status(500).json({ message: '서버 오류', error: err.message });
      }
      if (!user) {
          return res.status(400).json({ message: '로그인 정보가 잘못되었습니다.' });
      }
      req.logIn(user, (loginErr) => {
          if (loginErr) {
              return res.status(500).json({ message: '로그인 중 오류', error: loginErr.message });
          }
          res.json({ message: '로그인 성공!', user}); //user입력하면 user정보옴
          console.log('✅로그인성공!')
      });
  })(req, res, next);
  //axios로 post요청보낸 이메일과 비밀번호 확인
  console.log(req.body.email, req.body.password)
});



/**로그아웃 */
app.get("/logout", (req, res) => {
  req.logout();
});

app.use(express.static(path.join(__dirname, 'webTodo-fronted/dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/webTodo-fronted/dist/index.html'));
});

