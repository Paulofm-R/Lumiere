const express = require('express');
const jogoController = require("../controllers/jogos.controller");

// express router
let router = express.Router();


router.route('/')
    .get(jogoController.findAll)
    .post(jogoController.create);

router.route('/:jogoID')
    .get(jogoController.findOne)
    .delete(jogoController.delete);

router.route('/:jogoID/classificacao')
    .get(jogoController.findClassificacao)
    .post(jogoController.addClassificacao);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'Jogos: what???' });
})

module.exports = router;