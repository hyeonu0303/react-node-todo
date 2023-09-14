require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');
const passport = require('passport'); //passport lib
const findOrCreate = require('mongoose-findorcreate');

//config import
const connectDB = require('./config/db'); //db연결
const sessionConfig = require('./config/session'); //express-session

const app = express();
const port = process.env.PORT;

//미들웨어
app.use(express.json());
app.use(cors({
  credentials: true}
  ));
app.use(express.urlencoded({extended: true})) 
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

//서버
app.listen(port, function () {
  console.log(`🚀 Server On ${port}port`)
}); 

/**DB연결*/
connectDB();

/**Strategy */
require('./config/passport'); //로컬로그인
require('./config/passport-google'); //google로그인
require('./config/passport-kakao'); //카카오 로그인

/**router */


/**로그인 확인하기위한 미들웨어 */
const isLoggined = (req,res,next) => {
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.send('로그인안함')
  }
}

/**메인페이지 라우트 */
app.use('/', require('./routes/todo'));

/**로컬로그인 */
app.use('/',require('./routes/localLogin'));

/**구글,카카오API */
app.use('/', require('./routes/auth'));

//static
app.use(express.static(path.join(__dirname, 'webTodo-fronted/dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/webTodo-fronted/dist/index.html'));
});

