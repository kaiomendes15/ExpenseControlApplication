const pool = require('../../data')
const bcrypt = require('bcrypt');
const { getUserInfos, verifyUser } = require('../repositories/repositories')

module.exports = class Transactions {
    constructor(){}
    async createTransaction(userId, amount, category, date, type, note) {

        const user = getUserInfos(userId)
        const userExist = verifyUser(user.email)
        if (!userExist) {
            return 'User not found.'
        }

        const query = 'INSERT INTO transactions (userId, amount, category, date, type, note) VALUES ($1, $2, $3, $4, $5, $6)'
        await pool.query(query, [userId, amount, category, date, type, note])

        return 'Transaction created successfully.'
    }
}