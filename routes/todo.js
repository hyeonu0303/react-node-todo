let router = require('express').Router();
let Todo = require('../schema/Task');
let Tags = require('../schema/Tags');

/**할일입력 데이터저장 */
router.post('/api/todoData',(req,res)=>{
  let todoData = req.body.todoData;
  
  const todo = new Todo({
    user: req.user._id,
    content: todoData.content,
    date: todoData.date,
    selectTag: todoData.selectTag
  });
  todo.save()
    .then((result)=>{
      console.log(`저장완료: ${result}`);
    })
})

/**태그저장 */
router.post('/api/tags',(req,res)=>{

  console.log(req.body.tags);
  //수정하는코드짜야함
  /* const tags = new Tags({
    user: req.user._id,
    tags: req.body.tags
  });

  tags.save()
    .then((result)=>{
      console.log(`저장완료${result}`)
    }) */
})

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
        const selectTag = result[i].selectTag;

        if(!todoData[date]){
          todoData[date] = [{content, selectTag}];
        }else{
          todoData[date].push({content, selectTag});
        }
      }
      console.log(todoData);
      res.json(todoData);
    })
    .catch((error) => {console.log('date GET요청에러')})
});
module.exports = router;