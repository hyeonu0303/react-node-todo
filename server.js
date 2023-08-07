require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());

app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, './webTodo-fronted/dist')));

/**secret key */
// const secretKey = crypto.randomBytes(32).toString('hex');

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: store
}));

/**
 * loginUser Data
 */
const Login = require('./models/login');
/**
 * ? 연결만해서 가능한가?
 */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB에 연결되었습니다.');
  })
  .catch((err) => {
    console.error('MongoDB 연결 오류: ', err);
  });

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})


/**
 * 로그인
 */
app.post('/api/login',passport.authenticate('local', {failureRedirect : '/fail'}),(req,res)=>{
  Login.findOne({id:'test'})
    .then((result)=>{
      console.log(result)
      res.redirect('/')
    })
    .catch((err)=>{console.log(err)});
})

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
  //console.log(입력한아이디, 입력한비번);
  Login.findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done("로컬에러: "+에러);

    if (!결과) return done(null, false, { message: '존재하지 않는 아이디요' });

    if (입력한비번 == 결과.password) {
      return done(null, 결과);
    } else {
      return done(null, false, { message: '비번틀렸어요' });
    }
  });
}));






//react에서 라우팅 담당
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './webTodo-fronted/dist/index.html'));
});



