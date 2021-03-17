const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

// crear el servidor
const app = express();

// Conectar a la db
connectDB();

// Habilitar cors
app.use(cors())

// Habilitar express.json
app.use(express.json({ extended: true }))

// Puerto de la app
const port = process.env.port || 3001;

// Importar rutas
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))


// Definir la pagina principal
app.get('/', (req, res) => {
    res.send('Hola mundo')
})

// Iniciar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`app running at port ${port}`)
})
