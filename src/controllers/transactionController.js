const TransactionModel = require('../models/services/transactionModel')
exports.createTransaction = (async (req, res, next) => {
    const { amount, category, type, note } = req.body;
    const service = new TransactionModel();
    const status = await service.createTransaction(req.userId, amount, category, type, note)

    if (status === 'User not found.') {
        return res.status(404).json({message: 'User not found.'})
    }

    return res.status(200).json({status})
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

    if (update === `Transaction not found.`) {
        return res.status(404).json({message : `Transaction not found.`})
    }

    return res.status(200).json({update})
})

exports.deleteTransaction = (async (req, res, next) => {
    const id = req.params.id
    
    const service = new TransactionModel();
    const status = await service.deleteTransactionById(id);

    if (status === `Transaction not found.`) {
        return res.status(404).json({message : `Transaction not found.`})
    }
    return res.status(200).json({status})
})