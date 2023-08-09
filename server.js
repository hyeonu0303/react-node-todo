const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
var cors = require('cors');
app.use(cors());

app.listen(3000, function () {
  console.log('listening on 3000')
}); 

app.use(express.static(path.join(__dirname, 'webTodo-fronted/dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/webTodo-fronted/dist/index.html'));
});
