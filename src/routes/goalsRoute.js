const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../models/repositories/repositories')

// CONTROLLER
const goalsController = require('../controllers/goalsController')

router.post('/goals', verifyJWT, goalsController.SetGoal)
router.get('/goals', verifyJWT, goalsController.GetGoals)
router.get('/goals/:id', verifyJWT, goalsController.GetGoalById)
router.delete('/goals/:id', verifyJWT, goalsController.DeleteGoalById)

module.exports = router