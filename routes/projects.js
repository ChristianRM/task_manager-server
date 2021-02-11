const express = require('express')
const router = express.Router()
const projectController = require('../controllers/ProjectController')
const auth = require('../middleware/auth')

// Crea proyectos
// api/projects
router.post('/',
    auth,
    projectController.createProject
)

module.exports = router