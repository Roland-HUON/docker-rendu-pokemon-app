// User routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.get('/users', userController.getUsers);
router.get('/users/login', userController.getUserByEmailAndPassword);
router.post('/users', userController.createUser);

module.exports = router;