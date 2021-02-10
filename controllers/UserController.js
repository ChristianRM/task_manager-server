const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    // Revisar si hay errores
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Extraer email y password
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (user)
            return res.status(400).json({ msg: 'User already exists' })

        // Crea usuario
        user = new User(req.body)

        // Hash al password
        const salt = await bcryptjs.genSalt(10)

        user.password = await bcryptjs.hash(password, salt)

        // Guardar usuario
        await user.save()

        // Crear y firmar el jwt
        const payload = {
            user: {
                id: user.id
            }
        }

        // Firmar el jwt
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error){
                throw error
            }
            res.json({ token })
        })



    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')

    }
}