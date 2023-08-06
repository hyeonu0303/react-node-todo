const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  id:{type: String, require:true},
  password: { type: String, required: true, unique: true },
});

const Login = mongoose.model('login', loginSchema);

module.exports = Login;

