// based on Lab 2
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const taskRoutes = require('./taskRoutes');
 
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
//there won't be a <h1> stating 404 if nonexistent route called, as in routes/index.js?

console.log('routes/api/index.js running.');
 
module.exports = router;