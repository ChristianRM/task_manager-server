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

module.exports = router