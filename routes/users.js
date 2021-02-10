// Ruta para crear usuario
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

// Crea un usuario
// api/usuarios
router.post('/', 
UserController.createUser
)

module.exports = router