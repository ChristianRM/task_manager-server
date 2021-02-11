const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    // Leer token del header
    const token = req.header('x-auth-token')

    // Revisar si no hay token
    if (!token)
        return res.status(401).json({ msg: 'Unauthorized' })

    // Validar token
    try {
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified.user
        next()
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' })
    }
}