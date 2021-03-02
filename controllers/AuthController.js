const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res) => {
    // Revisar si hay errores
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Extraer email y password
    const { email, password } = req.body

    try {
        // Revisar que sea un usuario registrado
        let user = await User.findOne({ email })
        if (!user)
            return res.status(400).json({ msg: 'User does not exist' })

        // Comparar password
        const correctPass = await bcryptjs.compare(password, user.password)
        if (!correctPass)
            return res.status(400).json({ msg: 'Incorrect password' })

        // Si todo es correcto crear y firmar JWT
        const payload = {
            user: {
                id: user.id
            }
        }

        // Firmar el jwt
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) {
                throw error
            }
            res.json({ token })
        })
    } catch (error) {
        res.status(500).json({ msg: 'There was a mistake' })
    }


}

// Obtiene que usuario esta autenticado
exports.authenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({ user })
    } catch (error) {
        res.status(500).json({ msg: 'There was a mistake' })

    }
}