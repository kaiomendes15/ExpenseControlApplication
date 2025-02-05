const pool = require('../data/')
const bcrypt = require('bcrypt')

// verifica se o email está no banco de dados
async function verifyUser(email) {
    const verifyQuery = 'SELECT * FROM users WHERE email = $1'
    const verifyResult = await pool.query(verifyQuery, [email])

    return verifyResult.rows.length !== 0

};

// verifica a senha no banco de dados
async function verifyPassowrd(email, password) {
    const hashedPassword = await pool.query('SELECT password FROM users WHERE email = $1', [email])
    
        const passwordMatch = await bcrypt.compare(password, hashedPassword.rows[0].password)

        return passwordMatch
}

async function getUserId(email) {
    const query = 'SELECT id FROM users WHERE LOWER(TRIM(email)) = LOWER(TRIM($1));'
    const result = await pool.query(query, [email])

    return result.rows[0].id
}


module.exports = { verifyUser, verifyPassowrd, getUserId }
