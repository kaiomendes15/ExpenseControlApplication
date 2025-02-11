const pool = require('../data')
const bcrypt = require('bcrypt');
const { getUserInfos, verifyUser } = require('../repositories/repositories')

module.exports = class Transactions {
    constructor(){}
    async createTransaction(userId, amount, category, type, note = '') {
        // console.log("criação de transação")
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

    async getTransactionById(transactionId) {
        try {
            const query = 'SELECT * FROM transactions WHERE id = $1';
            const table = await pool.query(query, [transactionId]);
            
            if (table.rows.length === 0) {
                return `Transaction not found.`
            }

            return table.rows

        } catch(err) {
            console.log(err)
            return `ERRO: ${err}`

        }


        
    }

    async editTransactionById(transactionId, amount, category, type, note = '') {
        const query = `
  BEGIN;
  UPDATE transactions 
  SET amount = $1, category = $2, type = $3, note = $4 
  WHERE id = $5;
  ROLLBACK;
  COMMIT;
`;
        const update = await pool.query(query, [transactionId, amount, category, type, note]);

        console.log(update)
        return update
    }

    async deleteTransactionById(transactionId) {
        const query = 'DELETE FROM transactions WHERE id = $1';
        const result = await pool.query(query, [transactionId])

        return result
    }
}