const Project = require('../models/Project')
const { validationResult } = require('express-validator')

// Crea un nuevo proyecto
exports.createProject = async (req, res) => {
    // Revisar si hay errores
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // Crear un nuevo proyecto
        const project = new Project(req.body)

        // Guardar creador via jwt
        project.author = req.user.id

        // Guardar el proyecto
        project.save()
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(500).send('Something wrong happened')
    }
}


// Traer todos los proyectos del usuario
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ author: req.user.id }).sort({ createdAt: -1 })
        res.json({ projects })
        console.log(req.user)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}

// Actualiza un proyecto
exports.updateProject = async (req, res) => {
    // Revisar si hay errores
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Extraer la info del proyecto
    const { name } = req.body
    const newProject = {}

    if (name)
        newProject.name = name
    try {
        // Revisar id
        let project = await Project.findById(req.params.id)

        // Existe el proyecto
        if (!project)
            return res.status(404).json({ msg: 'Project not found' })
        // Verificar el creador del proyecto
        if (project.author.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Unauthorized' })
        // Actualizar
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true })

        res.json({ project })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}

// Elimina un proyecto por su id
exports.deleteProject = async (req, res) => {
    try {
        // Revisar id
        let project = await Project.findById(req.params.id)

        // Existe el proyecto
        if (!project)
            return res.status(404).json({ msg: 'Project not found' })
        // Verificar el creador del proyecto
        if (project.author.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Unauthorized' })
        // Eliminar
        await Project.findOneAndDelete({ _id: req.params.id })
        res.json({ msg: 'Project deleted' })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}