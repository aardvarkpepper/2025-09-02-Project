// based on Lab 2
const router = require('express').Router();
const apiRoutes = require('./api/index');
 
//router.use('/api', authenticationMiddleware, apiRoutes);
router.use('/api', apiRoutes);
 
router.use((req, res) => {
  res.status(404).send(`<h1>404 Error</h1> <div>Please visit http://localhost:${process.env.PORT || 3000}/api/users to log in, api/projects, or api/tasks.</div>`);
});
// Triggers on anything not starting with /api, I suppose.
// Review how 'wildcard' routing is handled, and SQL injection (and other) attacks, including including enough in parameters/query to crash URL
 
module.exports = router;

/**
 * ### api/users
POST /api/users/register 
POST /api/users/login

### api/projects
POST /api/projects
GET /api/projects
GET /api/projects/:id
PUT /api/projects/:id
DELETE /api/projects/:id

### api/tasks
POST /api/projects/:projectId/tasks
GET /api/projects/:projectId/tasks
PUT /api/tasks/:taskId
DELETE /api/tasks/:taskId
 */