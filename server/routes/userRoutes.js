const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controller/userController');

// Create new user
router.post('/add', createUser);

// Get users (with optional search by name)
router.get('/', getAllUsers);

// Get user by id
router.get('/:id', getUserById);

// Update user
router.put('/edit/:id', updateUser);

// Delete user
router.delete('/delete/:id', deleteUser);

module.exports = router;
