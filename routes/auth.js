// Ruta para autenticar usuarios
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/AuthController')

// Autentica un usuario
// api/auth
router.post('/',
    [
        check('email', 'Please enter a valid email address').isEmail(),
        check('password', 'Password must be at least 8 characters long').isLength({ min: 8, max: 16 })
    ],
    authController.authUser
)

module.exports = router