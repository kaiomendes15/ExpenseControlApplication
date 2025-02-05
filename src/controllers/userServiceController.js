const UserService = require('../models/services/userServicesModel')

exports.deleteUser = ((req, res) => {
    console.log("Deletando usuário")
    // console.log("Corpo da requisição:", req.body); // Adicionando para depuração
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    const service = new UserService()
    const result = service.deleteUser(email, password)

    if(!result) {
        return res.status(400).json({message: "invalid data"})
    }

    return res.status(200).json({message: "User deleted successfully."})
})
