const pool = require('../data')
const bcrypt = require('bcrypt');
const { getUserInfos, verifyUser, getIncome, getExpenses } = require('../repositories/repositories')
const TransactionModel = require('../services/transactionModel')

module.exports = class Reports {
    constructor(){}
    async income(userId) {
        
        const user = new TransactionModel()
        const transactions = await user.getUserTransactions(userId)
        
        const income = getIncome(transactions)

        return income
    }

    async expenses(userId) {

        const user = new TransactionModel()
        const transactions = await user.getUserTransactions(userId)
        
        const expenses = getExpenses(transactions)

        return expenses

    }
}