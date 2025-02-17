const express = require('express');
const app = express()
const PORT = 3000;

// rotas 
const registerRouter = require('./routes/auth/register/RegisterRoute');
const loginRouter = require('./routes/auth/login/LoginRoute');
const userServiceRouter = require('./routes/userServiceRoute');
const transactionRouter = require('./routes/transactions')
const reportsRouter = require('./routes/reportsRoute')

// middleware para processar o corpo das requisições
app.use(express.json())

// usar as rotas
    // use() é um middleware que executa todas as requisições http independente da informação
app.use(loginRouter)
app.use(registerRouter)
app.use(userServiceRouter)
app.use(transactionRouter)
app.use(reportsRouter)


app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`)
})
