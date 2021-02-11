const Task = require('../models/Task')
const Project = require('../models/Project')
const { validationResult } = require('express-validator')

// Crea una nueva tarea
exports.createTask = async (req, res) => {
    // Revisar si hay errores
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        // Extraer proyecto y comprobar si existe
        const { project } = req.body

        const projectExists = await Project.findById(project)
        if (!projectExists)
            return res.status(404).send('Project not found')

        // Verificar el creador del proyecto
        if (projectExists.author.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Unauthorized' })

        // Crear la tarea
        const task = new Task(req.body)
        await task.save()

        res.json({ task })

    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}

exports.getTasks = async (req, res) => {
    try {
        // Extraer proyecto y comprobar si existe
        const { project } = req.body

        const projectExists = await Project.findById(project)
        if (!projectExists)
            return res.status(404).send('Project not found')

        // Verificar el creador del proyecto
        if (projectExists.author.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Unauthorized' })

        // Obtener las tareas por proyecto
        const tasks = await Task.find({ project })
        res.json({ tasks })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }

}