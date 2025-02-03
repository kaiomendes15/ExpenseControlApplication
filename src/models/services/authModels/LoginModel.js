
module.exports = class LoginModel {
    constructor(){}
    async login(email, password){
        const verifyQuery = 'SELECT * FROM users WHERE email = $1'
        const verifyResult = await pool.query(verifyQuery, [email])

        
    }
}