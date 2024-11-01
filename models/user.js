const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username: { type: String, required: true },
password: { type: String, required: true },
role: { type: String, enum: ['customer', 'staff'], required: true } // New field added
});

module.exports = mongoose.model('user', userSchema);
