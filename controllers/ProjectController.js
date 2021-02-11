const Project = require('../models/Project')
exports.createProject = async (req, res) => {
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