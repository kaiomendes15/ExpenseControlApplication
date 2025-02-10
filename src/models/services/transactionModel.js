const pool = require('../data')
const bcrypt = require('bcrypt');
const { getUserInfos, verifyUser } = require('../repositories/repositories')

module.exports = class Transactions {
    constructor(){}
    async createTransaction(userId, amount, category, type, note = '') {
        console.log("criação de transação")
        const user = getUserInfos(userId)
        const userExist = verifyUser(user.email)
        if (!userExist) {
            return 'User not found.'
        }

        const query = 'INSERT INTO transactions (userId, amount, category, type, note) VALUES ($1, $2, $3, $4, $5)'
        await pool.query(query, [userId, amount, category, type, note])

        return 'Transaction created successfully.'
    }

    async getUserTransactions(userId) {

        const query = 'SELECT * FROM transactions WHERE userId = $1';
        const tables = await pool.query(query, [userId]);

        return tables.rows
    }
}