let router = require('express').Router();
let Todo = require('../schema/Task');
let Tags = require('../schema/Tags');
let Task = require('../schema/Task');
let ImptContent = require('../schema/ImportanceContent')

/**할일입력 데이터저장 */
router.post('/api/todo',(req,res)=>{
  let todoData = req.body.todoData;
  console.log(todoData);
  const todo = new Todo({
    user: req.user._id,
    content: todoData.content,
    date: todoData.date,
    selectTag: todoData.selectTag,
    selectTime: todoData.selectTime
  });
  todo.save()
    .then((result)=>{
      console.log(`저장완료: ${result}`);
      res.json(result);
    })
})

/**컨텐츠 삭제요청 */
router.post('/api/delete/content',(req,res)=>{
  let id = req.body._id
  if(!id) return res.status(400).json({status:400, error:'id 값 필요'})
  Task.deleteOne({_id : id})
    .then(response=> res.json({status:200,response:response.data}))
    .catch(error=>res.status(500).json({status: 500, error: error}))
})

/**컨텐츠 저장요청 */
router.post('/api/importance/content', (req, res) => {
    const data = req.body.importanceData;
    ImptContent.findOne({ contentId: data.contentId })
      .then(existItem=>{
        if (existItem) {
          res.json({message:'이미저장한 컨텐츠입니다'})
        }
        else{
          const importanceContent = new ImptContent({
            user: req.user._id,
            contentId: data.contentId,
            content: data.content,
            time: data.time,
            visible: data.visible
          });  
          importanceContent.save()
          .then(result=>{
            console.log('중요데이터저장완료')
            return res.json(result.data)
          })
          .catch(error=>console.log(error))
        }
      })
});

/**중요컨텐츠 삭제 */
router.post('/api/delete/importance/content',(req, res) => {
  try {
    const data = req.body.importanceData;
    ImptContent.deleteOne({ contentId: data.contentId })
      .then(result=>{res.json('중요데이터 삭제완료'),console.log('중요데이터 삭제완료')})
  } catch (error) {
    console.error('삭제실패', error);
    res.status(500).send('삭제실패');
  }
});


/**모든 중요컨텐츠 GET요청 */
router.get('/api/importance/content',(req,res)=>{
  ImptContent.find({user:req.user._id})
    .select('-user')
    .then(response=>res.json(response))
    .catch(error=>res.status(500).json({message:'❌중요컨텐츠 GET요청에러'}))
  })


/**태그저장 */
router.post('/api/tags', async (req, res) => {
  try {
      const userTags = await Tags.findOne({ user: req.user._id });
      
      if (userTags) {
          if (!userTags.tags.includes(req.body.tags)) {
              await Tags.updateOne(
                { user: req.user._id }, 
                { $push: { tags: req.body.tags } }
              );
              console.log("태그 업데이트 성공");
          } else {
              console.log("태그가 이미 존재합니다.");
          }
      } else {
          const tags = new Tags({
              user: req.user._id,
              tags: [req.body.tags]
          });

          const savedTags = await tags.save();
          console.log('태그 저장 완료:', savedTags.tags);
      }

      res.status(200).send({ message: "태그 처리 완료" });
  } catch (error) {
      console.error("태그 저장 오류:", error);
      res.status(500).send({ message: "태그 저장 오류" });
  }
});

/**태그삭제 */
router.post('/api/tags/delete', (req,res)=>{
  Tags.findOne({user:req.user._id})
  .then(result=>{
    const deleteIndex = req.body.deleteIndex;
    filterTags = result.tags.filter((_,index)=>{
      return index !== deleteIndex;
    })

    result.tags = filterTags
    console.log('태그삭제완료')
    
    return result.save();
  })
  .then(updatedResult => {
    res.json({
      tags: updatedResult.tags
    });
  })

  .catch(error=>{if(error) console.log('태그 삭제실패')})
})

/**태그데이터전송 */
router.get('/api/tags',(req,res)=>{
  Tags.findOne({user:req.user._id})
    .select('-user')
    .then(tags => {
      if(tags){
        res.json({tags: tags.tags});
      }else{
        res.json({tags:[]});
      }
    })
    .catch(error=>{res.status(500).json({error: '태그조회오류'})});
})

/**메인페이지 데이터요청 */
router.get("/api/data", (req, res) => {
  Todo.find({ 
    user: req.user._id 
  })
    .select('-user')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {console.log('date GET요청에러')})
  });

  module.exports = router;
  