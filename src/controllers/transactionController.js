const TransactionModel = require('../models/services/transactionModel')
exports.createTransaction = (async (req, res, next) => {
    console.log("entrou no controller")
    const { amount, category, date, type, note } = req.body;
    const service = new TransactionModel();
    const transaction = await service.createTransaction(req.userId, amount, category, type, note)

    if (transaction === 'User not found.') {
        return res.status(401).json({message: 'User not found.'})
    }

    console.log(transaction)

})

exports.getTransactionByUserId = (async (req, res, next) => {
    console.log(`pegando as transaÇões do user de id = ${req.userId}`)
    const service = new TransactionModel();
    const transactions = await service.getUserTransactions(req.userId)

    if (transactions === 'User not found.') {
        return res.status(401).json({message: 'User not found.'})
    }

    console.log(transactions)
    return res.json({transactions})

})