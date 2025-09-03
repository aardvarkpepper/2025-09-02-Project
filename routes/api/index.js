// based on Lab 2
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const taskRoutes = require('./taskRoutes');

// note:  Build out another tasks route, child or projects.  Per assignment instructions.
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
//there won't be a <h1> stating 404 if nonexistent route called, as in routes/index.js?
 
module.exports = router;