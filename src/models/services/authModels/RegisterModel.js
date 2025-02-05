const pool = require('../../data')
const bcrypt = require('bcrypt');
const { verifyUser } = require('../../repositories/repositories')

module.exports = class RegisterModel {
    constructor(){}
    async createUser(email, username, password) {
        const userExist = await verifyUser(email)
        // console.log(userExist);
        

        if (userExist) {
            console.log('Email já cadastrado.');
            return false
        }

        const hash = await bcrypt.hash(password, 10)
        // console.log(hash)

        const query = 'INSERT INTO users (email, username, password) VALUES ($1, $2, $3)'
        await pool.query(query, [email, username, hash])
        console.log('Usuário registrado com sucesso!')

        return true
    }
}