const { verifyUser, verifyPassowrd, getUserId } = require('../../repositories/repositories');
require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = class LoginModel {
    constructor(){}
    async login(email, password){
        const userExist = await verifyUser(email)
        // console.log(userExist);
        

        if (!userExist) {
            return 'User not found'
        }

        const passwordMatch = verifyPassowrd(email, password)

        if (!passwordMatch) {
            return 'Invalid Password.'
        }

        const userId = await getUserId(email)
        console.log(userId)

        return jwt.sign({userId}, process.env.SECRET_KEY, { expiresIn: '1h' })

         


        
    }
}