require('dotenv').config();         // read environment variables from .env file
const express = require('express');
const cors = require('cors');       // middleware to enable CORS (Cross-Origin Resource Sharing)

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

const corsOptions = {
    // origin: "http://localhost:8081"
};

app.use(cors(corsOptions)); //enable CORS requests from http://localhost:8081
app.use(express.json()); //enable parsing JSON body data

// root route -- /api/
app.get('/Lumiere', function (req, res) {
    res.status(200).json({ message: 'home -- Lumiere api' });
});

// routing middleware
app.use('/Lumiere/filmes', require('./routes/filmes.routes.js'))
app.use('/Lumiere/jogos', require('./routes/jogos.routes.js'))
app.use('/Lumiere/utilizadores', require('./routes/utilizadores.routes.js'))
app.use('/Lumiere/categorias', require('./routes/categorias.routes.js'))
app.use('/Lumiere/desafios', require('./routes/desafios.routes.js'))

// handle invalid routes
app.get('*', function (req, res) {
    res.status(404).json({ message: 'WHAT???' });
})
app.listen(port, () => console.log(`App listening at http://${host}:${port}/Lumiere`));