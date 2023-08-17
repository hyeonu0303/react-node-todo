require('dotenv').config();
const mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_URI;

const connectDB = () => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB 연결성공');
  })
  .catch(err => {
    console.error('❌ MongoDB 연결실패 :', err.message);
  });
};

module.exports = connectDB;