const pool = require('../data')
const bcrypt = require('bcrypt');
const { getUserInfos, verifyUser, getIncome } = require('../repositories/repositories')
const TransactionModel = require('../services/transactionModel')

module.exports = class Reports {
    constructor(){}
    async summary(userId) {
        
        const user = new TransactionModel()
        const transactions = await user.getUserTransactions(userId)
        
        const income = getIncome(transactions)

        return income
    }
}