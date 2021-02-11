const Project = require('../models/Project')
const { validationResult } = require('express-validator')

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