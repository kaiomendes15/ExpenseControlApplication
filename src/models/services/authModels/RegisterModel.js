const pool = require('../../data')

module.exports = class registerModel {
    constructor(){}
    async createUser(email, username, password) {
        const verifyQuery = 'SELECT * FROM users WHERE email = $1'
        const verifyResult = await pool.query(verifyQuery, [email])

        if (verifyResult.rows.length !== 0) {
            console.log('Email já cadastrado.');
            return false
        }

        const query = 'INSERT INTO users (email, username, password) VALUES ($1, $2, $3)'
        await pool.query(query, [email, username, password])
        console.log('Usuário registrado com sucesso!')

        return true
    }
}