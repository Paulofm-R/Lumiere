const express = require('express');
const jogoController = require("../controllers/jogos.controller");
const autenticadoController = require("../controllers/autenticado.controller");

// express router
let router = express.Router();


router.route('/')
    .get(autenticadoController.verifyToken, jogoController.findAll)
    .post(autenticadoController.verifyToken, jogoController.create);

router.route('/:jogoID')
    .get(autenticadoController.verifyToken, jogoController.findOne)
    .delete(autenticadoController.verifyToken, jogoController.delete);

router.route('/:jogoID/classificacao')
    .get(autenticadoController.verifyToken, jogoController.findClassificacao)
    .post(autenticadoController.verifyToken, jogoController.addClassificacao);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'Jogos: what???' });
})

module.exports = router;