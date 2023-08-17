require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const secret_key = process.env.SECRET_KEY;
const mongoUrl = process.env.MONGODB_URI;

module.exports=session({
  secret: secret_key,
  resave: true,
  saveUninitialized: false,
  store:MongoStore.create({
    mongoUrl: mongoUrl,
    ttl: 24 * 60 * 60 //세션 24시간후 만료 자동삭제됨
  })
});