const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  techStack: {
    type: [String],
  },
  requirements: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
