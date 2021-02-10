const express = require('express')
const router = express.Router()
const projectController = require('../controllers/ProjectController')

// Crea proyectos
// api/projects
router.post('/',
    projectController.createProject
)

module.exports = router