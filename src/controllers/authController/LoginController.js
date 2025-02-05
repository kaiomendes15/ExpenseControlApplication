const LoginModel = require('../../models/services/authModels/LoginModel')

exports.getLogin = (async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' })
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required.' })
    }

    const login = new LoginModel()
    const token = await login.login(email, password)

    if (token === 'User not found') {
        return res.status(401).json({message: 'User not found'})
    }
    if (token === 'Invalid Password.') {
        return res.status(401).json({message: 'Invalid Password.'})
    }

    return res.json({ auth: true, token })

    // res.send(`
    //     <h1>SO PARA TESTE!!!!!!!!!!</h1>
    //     <h2>${testeRota}</h2>`)
})