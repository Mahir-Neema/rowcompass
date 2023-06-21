const express = require('express');
const router = express.Router();
const collaborationController = require('../controllers/collaborationController');

router.post('/', collaborationController.sendCollaborationRequest);
router.put('/:id/accept', collaborationController.acceptCollaborationRequest);
router.put('/:id/decline', collaborationController.declineCollaborationRequest);

module.exports = router;
