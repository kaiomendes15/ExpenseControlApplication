const pool = require('../data')
const bcrypt = require('bcrypt');
const { getUserInfos, verifyUser } = require('../repositories/repositories')

module.exports = class Transactions {
    constructor(){}
    async createTransaction(userId, amount, category, type, note = '') {
        // console.log("criação de transação")
        const user = await getUserInfos(userId)
        const userExist = await verifyUser(user.email)
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

        if (tables.rows === 0) {
            return `Transactions not found.`
        }

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

    async editTransactionById(transactionId, amount, category, type, note = ''){
        const client = await pool.connect()
        console.log("Entrou na função")
        try {
            await client.query('BEGIN')
            const query = `UPDATE transactions SET amount = $1, category = $2,type = $3, note = $4 WHERE id = $5`;

            await client.query(query, [amount, category, type, note, transactionId]);
            await client.query('COMMIT')

            const service = new Transactions()
            const transaction = await service.getTransactionById(transactionId)

            if (transaction === `Transaction not found.`) {
                return 'Transaction not found.'
            }

            return 'Transaction updated successfully'
            
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    }

    async deleteTransactionById(transactionId) {
        const client = await pool.connect()

        const service = new Transactions()
        const transaction = await service.getTransactionById(transactionId)
        if (transaction === `Transaction not found.`) {
            return 'Transaction not found.'
        }

        try {
            await client.query('BEGIN')
            const query = 'DELETE FROM transactions WHERE id = $1';
            await client.query(query, [ transactionId ]);
            await client.query('COMMIT');
    
            return `Transaction deleted successfully.`

        } catch (e) {
            await client.query('ROLLBACK')
            console.log(e)
            throw e 
        } finally {
            client.release()
        }
    }
}