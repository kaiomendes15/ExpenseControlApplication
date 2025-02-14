const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../models/repositories/repositories')

// CONTROLLER
const reportsController = require('../controllers/reportsController')

router.get('/reports/summary', verifyJWT, reportsController.getSummary)

module.exports = router