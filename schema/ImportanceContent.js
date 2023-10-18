const mongoose = require('mongoose');

const imptContentSchema = new mongoose.Schema({
  contentId: {
    type: String,
  },
  content: {
    type: String,
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
