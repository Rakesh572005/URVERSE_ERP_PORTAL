const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: true
  }
});

module.exports = mongoose.model('studentlogin', userSchema);