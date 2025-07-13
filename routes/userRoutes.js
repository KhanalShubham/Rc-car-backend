const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser, validateUserUpdate, validateId } = require('../middleware/validation');

// Create a new user
router.post('/', validateUser, userController.createUser);

// Get all users with pagination and sorting
router.get('/', userController.getAllUsers);

// Get user statistics
router.get('/stats', userController.getUserStats);

// Delete all users
router.delete('/', userController.deleteAllUsers);

// Get user by ID
router.get('/:id', validateId, userController.getUserById);

// Update user by ID
router.put('/:id', validateId, validateUserUpdate, userController.updateUser);

// Delete user by ID
router.delete('/:id', validateId, userController.deleteUser);

module.exports = router; 