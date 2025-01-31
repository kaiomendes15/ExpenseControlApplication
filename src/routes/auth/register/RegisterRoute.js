const express = require('express');
const router = express.Router();

// CONTROLLER
const registerController = require('../../../controllers/authController/RegisterController')
const UserServiceController = require('../../../controllers/userServiceController')
router.post('/auth/register', registerController.registerUser);
router.delete('/auth/register/:username', UserServiceController.deleteUser);


module.exports = router