const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Route for adding a project
router.post('/', projectController.addProject);

module.exports = router;
