const RegisterModel = require('../../models/services/authModels/RegisterModel')

exports.registerUser = ((req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' })
    }

    const register = new RegisterModel()
    const wasUserCreated = register.createUser(email, username, password)

    if (!wasUserCreated) {
        return res.status(400).json({ message: 'Email já cadastrado.'})
    }

    return res.status(400).json({message: 'Usuário criado com sucesso.'})
    
})