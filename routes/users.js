// Ruta para crear usuario
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const { check } = require('express-validator')

// Crea un usuario
// api/usuarios
router.post('/',
    [
        check('name', 'Name field is needed').not().isEmpty(),
        check('email', 'Please enter a valid email address').isEmail(),
        check('password', 'Password must be at least 8 characters long').isLength({ min: 8, max: 16 })
    ],
    UserController.createUser
)

module.exports = router