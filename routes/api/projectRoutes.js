const express = require('express');
const router = express.Router();
const verifyAuthentication = require('../../utils/authMiddleware');

const { createProject, getAllProjects, getProjectById, updateProjectById, deleteProjectById, createTask, getTasksByProject } = require('../../controllers/projectController');

// For some software for some routes, not all operations would require authentication.  For this assignment, though, authentication is required for all routes.
// Here, control flow is - see userController for logic, userRoutes for invocation - when a user registers, no jwt token is created.  Possibly have registration call on login later.
// When a user logs in, a payload is generated to put in a jwt.  This contains _id and username, both nonsensitive information.  A JWT_SECRET env variable is used to encrypt.  The id and username and encrypt are sent all together; in other situations a role might be added to the plain data and encrypt data.
// When verifyAuthentication middlware is processed, the jwt token is processed.  If the plain data and the encrypt match, then the id and role (not always the username) or whatever data are put in req.user.  If there is no match (e.g. someone tried to change their role from 'user' to 'admin') then the encrypt won't match, and 'Token is invalid' (or similar) returns.
// Later, data is extracted from req.user for use.  This is how user ID is obtained in various routes following.
router.post('/', verifyAuthentication. createProject);
router.get('/', verifyAuthentication, getAllProjects);
router.get('/:id', verifyAuthentication, getProjectById);
router.put('/:id', verifyAuthentication, updateProjectById);
router.delete('/:id', verifyAuthentication, deleteProjectById);

// split below into child router later
router.post('/:projectId/tasks', verifyAuthentication, createTask); // see what happens when put last.  after all / routes okay.  Also see what happens if importing.
router.get('/:projectId/tasks', verifyAuthentication, getTasksByProject);
 
module.exports = router;