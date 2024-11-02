const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: { // New field added
    type: String,
    enum: ['customer', 'staff'],
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
