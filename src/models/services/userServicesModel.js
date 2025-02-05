const pool = require('../data')
const bcrypt = require('bcrypt')
const { verifyUser, verifyPassowrd } = require('../repositories/repositories')

module.exports = class UserService {
    constructor(){}
    deleteUser = async (email, password) => {
        const userExist = await verifyUser(email)
        // console.log(userExist);
        
        
        if (!userExist) {
            console.log('Usuário não cadastrado')
            return false
        }
        
        const passwordMatch = await verifyPassowrd(email, password)
        // console.log(passwordMatch);
    
        if (!passwordMatch) {
            console.log("Senha incorreta.")
            return false
        }
    
        await pool.query('DELETE FROM users WHERE email = $1', [email])
        return true
    }
}