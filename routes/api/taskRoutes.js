const express = require('express');
const router = express.Router();
const verifyAuthentication = require('../../utils/authMiddleware');

const { updateTaskById, deleteTaskById } = require('../../controllers/taskController');

// get '/' and post '/' are located in projectRoutes / projectController, as functionality is tied to project ID.
router.put('/:id', verifyAuthentication, updateTaskById);
router.delete('/:id', verifyAuthentication, deleteTaskById);
 
module.exports = router;