const mongoose = require('mongoose');
const tagSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true,
  },
  tags:[String]
});

module.exports = mongoose.model('Tags', tagSchema);