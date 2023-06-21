const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  techStack: {
    type: [String],
    required: true
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// User model
const User = mongoose.model('User', userSchema);

module.exports = User;
