const express = require('express');
const router = express.Router();

// CONTROLLER
const loginController = require('../../../controllers/authController/LoginController')

router.post('/auth/login', loginController.getLogin);


module.exports = router