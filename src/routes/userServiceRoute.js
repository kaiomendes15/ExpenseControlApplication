const express = require('express');
const router = express.Router();

const UserServiceController = require('../controllers/userServiceController')

router.delete('/config/delete/', UserServiceController.deleteUser);


module.exports = router