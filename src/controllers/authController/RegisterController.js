const RegisterModel = require('../../models/services/authModels/RegisterModel')

exports.registerUser = (async (req, res) => {
    console.log("Post de registro")
    // console.log("Corpo da requisição:", req.body); // Adicionando para depuração
    const { email, username, password, verifyPassword } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' })
    }
    if (!username) {
        return res.status(400).json({ message: 'Username is required.' })
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

    const register = new RegisterModel()
    const createRequest = await register.createUser(email, username, password)

    if (createRequest === 'Email already registered.') {
        return res.status(400).json({ message: 'Email already registered'})
    }

    return res.status(200).json({message: 'User registered successfully'})
    
})
