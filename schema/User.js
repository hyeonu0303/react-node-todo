const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String
},{
  collection:'users' //내가원하는 collection이름
});

//대부분 username이 아이디로 쓰이므로 설정을 바꿔줘야함
userSchema.plugin(passportLocalMongoose,{
  usernameField: 'email'
});

module.exports = mongoose.model('User', userSchema);