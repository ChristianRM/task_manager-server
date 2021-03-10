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

// Traer tareas de un proyecto
exports.getTasks = async (req, res) => {
    try {
        // Extraer proyecto y comprobar si existe
        const { project } = req.query

        const projectExists = await Project.findById(project)
        if (!projectExists)
            return res.status(404).send('Project not found')

        // Verificar el creador del proyecto
        if (projectExists.author.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Unauthorized' })

        // Obtener las tareas por proyecto
        const tasks = await Task.find({ project }).sort({ createdAt: -1 })
        res.json({ tasks })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }

}

// Actualizar una tarea
exports.updateTask = async (req, res) => {
    try {
        // Extraer proyecto y comprobar si existe
        const { project, name, status } = req.body

        // Verificar si la tarea existe
        let task = await Task.findById(req.params.id)
        if (!task)
            return res.status(404).send('Task not found')

        // Extraer proyecto
        const projectExists = await Project.findById(project)
        if (!projectExists)
            return res.status(404).send('Project not found')

        // Verificar el creador del proyecto
        if (projectExists.author.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Unauthorized' })

        // Crear un objeto con la nueva tarea
        const newTask = {}
        newTask.name = name
        newTask.status = status

        // Guardar la tarea
        task = await Task.findByIdAndUpdate({ _id: req.params.id }, newTask, { new: true })

        res.json({ task })

    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
    try {
        // Extraer proyecto y comprobar si existe
        const { project } = req.query

        // Verificar si la tarea existe
        let task = await Task.findById(req.params.id)
        if (!task)
            return res.status(404).send('Task not found')

        // Extraer proyecto
        const projectExists = await Project.findById(project)
        if (!projectExists)
            return res.status(404).send('Project not found')

        // Verificar el creador del proyecto
        if (projectExists.author.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Unauthorized' })

        // Eliminar tarea
        await Task.findOneAndDelete({ _id: req.params.id })
        res.json({ msg: 'Task deleted' })

    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}