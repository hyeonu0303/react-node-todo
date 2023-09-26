const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true,
  },
  content: {
    type: String,
    required:true
  },
  date: {
    type: [String],
    required: true
  },
  selectTag:{
    type: String,
  },
  selectTime: String,
  importance: String
},{
  collection:'task' //내가원하는 collection이름
});

todoSchema.index({ user: 1 });
module.exports = mongoose.model('Task', todoSchema);