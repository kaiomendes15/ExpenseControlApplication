const express = require('express');
const router = express.Router();

// CONTROLLER
const registerController = require('../../../controllers/authController/RegisterController')
router.post('/auth/register', registerController.registerUser);


module.exports = router