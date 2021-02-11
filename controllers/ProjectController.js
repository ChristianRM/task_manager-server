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
        const projects = await Project.find({ author: req.user.id }).sort({ createdAt: -1})
        res.json({ projects })
        console.log(req.user)
    } catch (error) {
        console.log(error)
        res.status(500).send('Something is wrong')
    }
}