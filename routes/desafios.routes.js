const express = require('express');
const desafioController = require("../controllers/desafios.controller");
const autenticadoController = require("../controllers/autenticado.controller");

// express router
let router = express.Router();


router.route('/')
    .get(autenticadoController.verifyToken, desafioController.findAll)
    .post(autenticadoController.verifyToken, desafioController.create);

router.route('/:desafioID')
    .get(autenticadoController.verifyToken, desafioController.findOne)

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'Categorias: what???' });
})

module.exports = router;