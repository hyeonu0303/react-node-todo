require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path');
const port = process.env.PORT

app.use(express.json());
let cors = require('cors');
app.use(cors());

/**
 * mongoose연결
 * 스키마정의 - > 모델형성 
 * 모델 -> 문서를 생성,조회,수정,삭제 가능 
 */
const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB에 연결되었습니다.');
  })
  .catch((err) => {
    console.error('MongoDB 연결 오류:', err);
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

app.use(express.static(path.join(__dirname, 'webTodo-fronted/dist')));








//react에서 라우팅 담당
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/webTodo-fronted/dist/index.html'));
});



