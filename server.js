require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;
const mongoUrl = process.env.MONGODB_URI;
const secret_key = process.env.SECRET_KEY;
app.use(express.json());
var cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended: true})) 

app.listen(port, function () {
  console.log(`listening on ${port}`)
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

