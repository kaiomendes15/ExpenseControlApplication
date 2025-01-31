const UserService = require('../models/services/userServices')

exports.deleteUser = ((req, res) => {
    console.log("Deletando usuário")
    console.log("Corpo da requisição:", req.body); // Adicionando para depuração
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' })
    }

    const service = new UserService()
    const result = service.deleteUser(email, password)

    if(!result) {
        return res.status(400).json({message: "Email não cadastrado e/ou senha inválida."})
    }

    return res.status(200).json({message: "Usuário deletado com sucesso."})
})
