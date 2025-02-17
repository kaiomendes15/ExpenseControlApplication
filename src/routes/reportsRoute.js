const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../models/repositories/repositories')

// CONTROLLER
const reportsController = require('../controllers/reportsController')

router.get('/reports/summary/income', verifyJWT, reportsController.Income)
router.get('/reports/summary/expenses', verifyJWT, reportsController.Expenses)

module.exports = router