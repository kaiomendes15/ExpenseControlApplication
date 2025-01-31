const pool = require('../../data')
const bcrypt = require('bcrypt');

module.exports = class RegisterModel {
    constructor(){}
    async createUser(email, username, password) {
        const verifyQuery = 'SELECT * FROM users WHERE email = $1'
        const verifyResult = await pool.query(verifyQuery, [email])

        if (verifyResult.rows.length !== 0) {
            console.log('Email já cadastrado.');
            return false
        }

        const hash = await bcrypt.hash(password, 10)

        const query = 'INSERT INTO users (email, username, password) VALUES ($1, $2, $3)'
        await pool.query(query, [email, username, hash])
        console.log('Usuário registrado com sucesso!')

        return true
    }
}