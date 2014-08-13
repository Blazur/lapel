var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  github: {
    id: String,
    token: String
  }
});

module.exports = mongoose.model('User', UserSchema);
