const LoginModel = require('../../models/services/authModels/LoginModel')

exports.getLogin = ((req, res) => {

    const login = new LoginModel()
    const testeRota = login.testeRota()

    res.send({
        nome: testeRota
    })

    // res.send(`
    //     <h1>SO PARA TESTE!!!!!!!!!!</h1>
    //     <h2>${testeRota}</h2>`)
})