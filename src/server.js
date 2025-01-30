const express = require('express');
const app = express()
const PORT = 3000;

// rotas 
const registerRouter = require('./routes/auth/register/RegisterRoute');
const loginRouter = require('./routes/auth/login/LoginRoute');

// usar as rotas
    // use() é um middleware que executa todas as requisições http independente da informação
app.use(loginRouter)
app.use(registerRouter)

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`)
})
