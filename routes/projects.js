const express = require('express')
const router = express.Router()
const projectController = require('../controllers/ProjectController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

// Crea proyectos
// api/projects
router.post('/',
    auth,
    [
        check('name', 'Name field is needed').not().isEmpty()
    ],
    projectController.createProject
)

// Obtener todos los proyectos del usuario
router.get('/',
    auth,
    projectController.getProjects
)

// Actualiza un proyecto
router.put('/:id',
    auth,
    [
        check('name', 'Name field is needed').not().isEmpty()
    ],
    projectController.updateProject
)

// Borra un proyecto
router.delete('/:id',
    auth,
    projectController.deleteProject
)

module.exports = router