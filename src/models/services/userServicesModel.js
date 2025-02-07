const pool = require('../data')
const bcrypt = require('bcrypt')
const { verifyUser, verifyPassword } = require('../repositories/repositories')

module.exports = class UserService {
    constructor(){}
    deleteUser = async (email, password) => {
        const userExist = await verifyUser(email)
        // console.log(userExist);
        
        
        if (!userExist) {
            return 'User not found.'
        }
        
        const passwordMatch = await verifyPassword(email, password)
        // console.log(passwordMatch);
    
        if (!passwordMatch) {
            return "incorrect password."
        }
    
        await pool.query('DELETE FROM users WHERE email = $1', [email])
        return true
    }
}