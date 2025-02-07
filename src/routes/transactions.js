const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../models/repositories/repositories')

const UserServiceController = require('../controllers/userServiceController')

router.post('/transactions', verifyJWT, UserServiceController.deleteUser);


module.exports = router