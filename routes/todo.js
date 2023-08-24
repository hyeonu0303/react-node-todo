let router = require('express').Router();
let Todo = require('../schema/Todo');

router.post('/api/todoData',(req,res)=>{
  let todoData = req.body.todoData;
  console.log(todoData);
})

module.exports = router;