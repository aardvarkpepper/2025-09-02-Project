const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
// note:  Standard practice would be to deconstruct, as in other routes in this assignment.  Kept this for reference.

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.post('/register', userController.registerUser);
router.post('/login', userController.login)
 
module.exports = router;