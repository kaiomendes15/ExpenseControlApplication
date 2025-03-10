const express = require('express');
const app = express()
const PORT = 3000;
const { neon } = require("@neondatabase/serverless");
require('dotenv').config();
const http = require("http");
// const sql = neon(process.env.DATABASE_URL);
const pool = require('./models/data/index')

// rotas 
const registerRouter = require('./routes/auth/register/RegisterRoute');
const loginRouter = require('./routes/auth/login/LoginRoute');
const userServiceRouter = require('./routes/userServiceRoute');
const transactionRouter = require('./routes/transactions');
const reportsRouter = require('./routes/reportsRoute');
const goalsRouter = require('./routes/goalsRoute');


// middleware para processar o corpo das requisições
app.use(express.json())

// usar as rotas
    // use() é um middleware que executa todas as requisições http independente da informação
app.use(loginRouter)
app.use(registerRouter)
app.use(userServiceRouter)
app.use(transactionRouter)
app.use(reportsRouter)
app.use(goalsRouter)


const requestHandler = async (req, res) => {
    const result = await pool.query(`SELECT version()`);
    const { version } = result[0];
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(version);
  };

  app.get('/db-version-pool', async (req, res) => {
    try {
        const result = await pool.query(`SELECT version()`);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Erro ao conectar ao banco com Pool", details: err.message });
    }
});

//   http.createServer(requestHandler).listen(3000, () => {
//     console.log("Server running at http://localhost:3000");
app.listen(PORT, () => {
        console.log(`Server rodando na porta ${PORT}`)
    })


// app.listen(PORT, () => {
//     console.log(`Server rodando na porta ${PORT}`)
// })
