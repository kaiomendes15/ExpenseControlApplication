const TransactionModel = require('../models/services/transactionModel')
exports.createTransaction = (async (req, res, next) => {
    console.log("entrou no controller")
    const { amount, category, date, type, note } = req.body;
    const service = new TransactionModel();
    const transaction = await service.createTransaction(req.userId, amount, category, type, note)

    if (transaction === 'User not found.') {
        return res.status(404).json({message: 'User not found.'})
    }

    // console.log(transaction)

})

exports.getTransactionByUserId = (async (req, res, next) => {
    // console.log(`pegando as transaÇões do user de id = ${req.userId}`)
    const service = new TransactionModel();
    const transactions = await service.getUserTransactions(req.userId)

    // console.log(transactions)
    return res.status(200).json({transactions})

})

exports.getTransactionById = (async (req, res, next) => {
    const id = req.params.id
    const service = new TransactionModel();
    const transaction = await service.getTransactionById(id)

    if (transaction === `Transaction not found.`) {
        return res.status(404).json({message : `Transaction not found.`})
    }

    return res.status(200).json({transaction})
})

exports.editTransactionById = (async (req, res, next) => {
    const id = req.params.id;
    const { amount, category, type, note } = req.body;

    const service = new TransactionModel();
    const update = await service.editTransactionById(id, amount, category, type, note)

    return res.json({update})
})