const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  githubUsername: {
    type: String,
    unique: true
  },
  experience: {
    type: String
  },
  techStack: {
    type: [String],
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
