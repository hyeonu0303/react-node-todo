const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
var cors = require('cors');
app.use(cors());

app.listen(3000, function () {
  console.log('listening on 3000')
}); 

app.post('/api/register', (req, res) => {
  console.log('회원가입 데이터:', {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  // 나머지 회원가입 로직
  res.send('전송완료');
});

app.use(express.static(path.join(__dirname, 'webTodo-fronted/dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/webTodo-fronted/dist/index.html'));
});

