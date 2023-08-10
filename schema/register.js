const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String
},{
  collection:'register' //내가원하는 collection이름
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);