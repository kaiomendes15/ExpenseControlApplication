const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../../../models/repositories/repositories')

// CONTROLLER
const loginController = require('../../../controllers/authController/LoginController')

router.post('/auth/login', loginController.Login);
router.get('/user/profile', verifyJWT, loginController.getUserProfile)


module.exports = router