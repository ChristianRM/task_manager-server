const express = require('express')
const connectDB = require('./config/db')

// crear el servidor
const app = express();

// Conectar a la db
connectDB();

// Puerto de la app
const PORT = process.env.PORT || 3001;

// Definir la pagina principal
app.get('/', (req, res) => {
    res.send('Hola mundo')
})

// Iniciar la app
app.listen(PORT, () => {
    console.log(`app running at port ${PORT}`)
})
