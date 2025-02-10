const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../models/repositories/repositories')

const transactionController = require('../controllers/transactionController')

router.post('/transactions', verifyJWT, transactionController.createTransaction);
router.get('/transactions', verifyJWT, transactionController.getTransactionByUserId);


module.exports = router