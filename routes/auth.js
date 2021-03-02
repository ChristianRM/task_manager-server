// Ruta para autenticar usuarios
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/AuthController')
const auth = require('../middleware/auth')


// Autentica un usuario
// api/auth
router.post('/',
    authController.authUser
)


// Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.authenticatedUser
)
module.exports = router