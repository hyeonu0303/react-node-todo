require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

app.use(express.static(path.join(__dirname, 'webTodo-fronted/dist')));









//react에서 라우팅 담당
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/webTodo-fronted/dist/index.html'));
});



