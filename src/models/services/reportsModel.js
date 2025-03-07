const pool = require('../data')
const bcrypt = require('bcrypt');
const { getUserInfos, verifyUser, getIncome, getExpenses, categorySummary, getBalance } = require('../repositories/repositories')
const TransactionModel = require('../services/transactionModel')

module.exports = class Reports {
    constructor(){}
    async income(userId) {
        
        const user = new TransactionModel()
        const transactions = await user.getUserTransactions(userId)
        
        const income = await getIncome(transactions)

        return income
    }

    async expenses(userId) {

        const user = new TransactionModel()
        const transactions = await user.getUserTransactions(userId)
        
        const expenses = await getExpenses(transactions)

        return expenses

    }

    async balance(userId) {
        const income = await this.income(userId);
        console.log(income)
        const expenses = await this.expenses(userId);
        console.log(expenses)

        return getBalance(income.income, expenses.expenses)
        
    }

    async summary(userId, category) {
        console.log(category)
        if (category != "investments" && category != "bills." && category != "leisure.") {
            return "Invalid category."
        }
        const user = new TransactionModel()
        const transactions = await user.getUserTransactions(userId)

        if (transactions === `Transactions not found.`) {
            return `Transactions not found.`
        }
        // fazer uma checagem de categoria, limitar as categorias possiveis.
        const summary = categorySummary(transactions, category)

        return summary
    }
}