const express = require('express')
const router = express.Router()
const taskController = require('../controllers/TaskController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')


// Crea tarea
// api/tareas
router.post('/',
    auth,
    [
        check('name', 'Name field is needed').not().isEmpty(),
        check('project', 'Project field is needed').not().isEmpty()
    ],
    taskController.createTask
)

// Obtener las tareas del proyecto
router.get('/',
    auth,
    taskController.getTasks
)

// Actualizar una tarea
router.put('/:id',
    auth,
    taskController.updateTask
)

// Eliminar una tarea
router.delete('/:id',
    auth,
    taskController.deleteTask
)

module.exports = router