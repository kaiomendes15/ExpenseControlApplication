const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../models/repositories/repositories')

const transactionController = require('../controllers/transactionController')

router.post('/transactions', verifyJWT, transactionController.createTransaction);
router.get('/transactions', verifyJWT, transactionController.getTransactionByUserId);
router.get('/transactions/:id', verifyJWT, transactionController.getTransactionById);
router.put('/transactions/:id', verifyJWT, transactionController.editTransactionById);


module.exports = router