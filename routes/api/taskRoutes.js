const express = require('express');
const router = express.Router();
const verifyAuthentication = require('../../utils/authMiddleware');

const { updateTaskById, deleteTaskById } = require('../../controllers/projectController');

// get '/' and post '/' are located in projectRoutes / projectController, as functionality is tied to project ID.
router.put('/:id', updateTaskById);
router.delete('/:id', deleteTaskById);
 
module.exports = router;