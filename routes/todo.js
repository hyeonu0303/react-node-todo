let router = require('express').Router();
let Todo = require('../schema/Task');

router.post('/api/todoData',(req,res)=>{
  let todoData = req.body.todoData;
  
  const todo = new Todo({
    user: req.user._id,
    content: todoData.content,
    date: todoData.date
  });
  todo.save()
    .then((result)=>{
      console.log(`저장완료: ${result}`);
    })

})

router.get("/api/data", (req, res) => {
  Todo.find({ 
    user: req.user._id 
  })
    .then((result) => {
      const dates = result.map(item => item.date);
      // console.log(dates);
      res.json({dates});
    })
    .catch((error) => {console.log('date GET요청에러')})
});
module.exports = router;