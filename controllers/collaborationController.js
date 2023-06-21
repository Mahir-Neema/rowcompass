const User = require('../models/User');
const Project = require('../models/Project');

async function sendCollaborationRequest(req, res) {
  try {
    // Extract collaboration request details from the request body
    const { userId, projectId } = req.body;

    // Find the user and project associated with the collaboration request
    const user = await User.findById(userId);
    const project = await Project.findById(projectId);

    if (!user || !project) {
      return res.status(404).json({ error: 'User or project not found' });
    }

    // Add the user to the collaborators array in the project
    project.collaborators.push(user);
    await project.save();

    // Return a success response
    res.status(200).json({ message: 'Collaboration request sent successfully' });
  } catch (error) {
    // Handle any errors that occur during sending the collaboration request
    console.log(error);
    res.status(500).json({ error: 'Failed to send collaboration request' });
  }
}

async function acceptCollaborationRequest(req, res) {
  try {
    // Extract the collaboration request ID from the request parameters
    const requestId = req.params.id;

    // Find the collaboration request by ID
    const project = await Project.findById(requestId);

    if (!project) {
      return res.status(404).json({ error: 'Collaboration request not found' });
    }

    // Update the collaboration request status to accepted
    project.status = 'accepted';
    await project.save();

    // Return a success response
    res.status(200).json({ message: 'Collaboration request accepted successfully' });
  } catch (error) {
    // Handle any errors that occur during accepting the collaboration request
    console.log(error);
    res.status(500).json({ error: 'Failed to accept collaboration request' });
  }
}

async function declineCollaborationRequest(req, res) {
  try {
    // Extract the collaboration request ID from the request parameters
    const requestId = req.params.id;

    // Find the collaboration request by ID
    const project = await Project.findById(requestId);

    if (!project) {
      return res.status(404).json({ error: 'Collaboration request not found' });
    }

    // Update the collaboration request status to declined
    project.status = 'declined';
    await project.save();

    // Return a success response
    res.status(200).json({ message: 'Collaboration request declined successfully' });
  } catch (error) {
    // Handle any errors that occur during declining the collaboration request
    console.log(error);
    res.status(500).json({ error: 'Failed to decline collaboration request' });
  }
}

module.exports = {
  sendCollaborationRequest,
  acceptCollaborationRequest,
  declineCollaborationRequest,
};
