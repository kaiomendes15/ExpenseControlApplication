const pool = require('../data')
const bcrypt = require('bcrypt')

module.exports = class UserService {
    constructor(){}
    deleteUser = async (email, password) => {
        const verifyQuery = 'SELECT * FROM users WHERE email = $1'
        const verifyResult = await pool.query(verifyQuery, [email])
    
        if (verifyResult.rows.length === 0) {
            console.log('Usuário não cadastrado')
            return false
        }
    
        const hashedPassword = await pool.query('SELECT password FROM users WHERE email = $1', [email])
        console.log(typeof hashedPassword, hashedPassword)
    
        const passwordMatch = await bcrypt.compare(password, hashedPassword)
    
        if (!passwordMatch) {
            console.log("Senha incorreta.")
            return false
        }
    
        await pool.query('DELETE FROM users WHERE email = $1', [email])
        return true
    }
}