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

//전체데이터를 태그, 날짜, 할일입력란
/**메인페이지 데이터요청 */
router.get("/api/data", (req, res) => {
  Todo.find({ 
    user: req.user._id 
  })
    .then((result) => {
      const todoData = {};

      for(let i = 0; i < result.length; i++){
        const date = result[i].date;
        const content = result[i].content;
        // const labels = result[i].labels;

        if(!todoData[date]){
          todoData[date] = [{content}];
        }else{
          todoData[date].push({content})
        }
      }
      console.log(todoData);
      res.json(todoData);
    })
    .catch((error) => {console.log('date GET요청에러')})
});
module.exports = router;