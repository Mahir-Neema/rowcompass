const Project = require('../models/Project');

async function addProject(req, res) {
  try {
    const { name, description, collaborators, techStack, requirements, isActive } = req.body;

    // Create a new project instance
    const newProject = new Project({
      name,
      description,
      collaborators,
      techStack,
      requirements,
      isActive
    });

    // Save the new project to the database
    await newProject.save();

    res.status(201).json({ message: 'Project added successfully', project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add the project' });
  }
}

module.exports = {
  addProject
};
