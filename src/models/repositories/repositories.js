const pool = require('../data/')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


// verifica se o email está no banco de dados
async function verifyUser(email) {
    const verifyQuery = 'SELECT * FROM users WHERE email = $1'
    const verifyResult = await pool.query(verifyQuery, [email])

    return verifyResult.rows.length !== 0

};

// pega todas as informações do usuário
async function getUserInfos(userId) {
    const query = 'SELECT username, email FROM users WHERE id = $1'
    const result = await pool.query(query, [userId])
    // console.log(result.rows[0])
    return result.rows[0]
}

// verifica a senha no banco de dados
async function verifyPassword(email, password) {
    const hashedPassword = await pool.query('SELECT password FROM users WHERE email = $1', [email])
    
        const passwordMatch = await bcrypt.compare(password, hashedPassword.rows[0].password)

        return passwordMatch
}

// pega o id do usuário
async function getUserId(email) {
    const query = 'SELECT id FROM users WHERE LOWER(TRIM(email)) = LOWER(TRIM($1));'
    const result = await pool.query(query, [email])

    return result.rows[0].id
}

// verificação de chave jwt
async function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) return res.status(401).json({message: 'Unauthorized user'});

        req.userId = decodedToken.userId;
        // console.log(`userId: ${req.userId}`)
        next()
    })
}


module.exports = { verifyUser, verifyPassword, getUserId, verifyJWT, getUserInfos }
