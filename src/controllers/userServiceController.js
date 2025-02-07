const UserService = require('../models/services/userServicesModel')

exports.deleteUser = (async (req, res) => {
    console.log("Deletando usuário")
    // console.log("Corpo da requisição:", req.body); // Adicionando para depuração
    const { email, password, verifyPassword } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' })
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required.' })
    }
    if (!verifyPassword) {
        return res.status(400).json({ message: 'Please verify your password' })
    }

    if (password !== verifyPassword) {
        return res.status(400).json({ message: 'Passwords do not match' })
    }

    const service = new UserService()
    const result = await service.deleteUser(email, password)

    if(result === 'User not found.') {
        return res.status(404).json({message: 'User not found.'})
    }
    if (result === "incorrect password.") {
        return res.status(401).json({message: "incorrect password."})

    }

    return res.status(200).json({message: "User deleted successfully."})
})
