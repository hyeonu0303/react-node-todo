require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, './webTodo-fronted/dist')));
/**
 * mongoose연결
 * 스키마정의 - > 모델형성 
 * 모델 -> 문서를 생성,조회,수정,삭제 가능 
 * @todo 조회,수정,삭제,삽입 공부
 * @todo passport 및 비밀번호 암호화 라이브러리 설치
 */
const mongoose = require('mongoose');
/**
 * loginUser Data
 */
const Login = require('./models/login');
let db;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB에 연결되었습니다.');
    db = mongoose.connection;
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
app.post('/api/login',(req,res)=>{
  Login.find()
    .then((result)=>{
      console.log(result)
      res.json(result)
    })
    .catch((err)=>{console.log(err)});
})

//react에서 라우팅 담당
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './webTodo-fronted/dist/index.html'));
});



