const mongoose = require('mongoose');

const imptContentSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  contentId: {
    type: String,
    required:true,
  },
  content: {
    type: String,
    required:true
  },
  time: {
    type: String, 
  },
  visible: {
    type: Boolean,
  }
}, {
  collection: 'imptcontent'
});

module.exports = mongoose.model('Importance', imptContentSchema);
