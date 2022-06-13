const express = require('express');
const utilizadorController = require("../controllers/utilizadores.controller");
const autenticadoController = require("../controllers/autenticado.controller");


// express router
let router = express.Router();

router.route('/')
    .get(autenticadoController.verifyToken, utilizadorController.findAll)
    .post(utilizadorController.create);

router.route('/:utilizadorID')
    .patch(autenticadoController.verifyToken, utilizadorController.update)
    .get(autenticadoController.verifyToken, utilizadorController.findOne)
    .delete(autenticadoController.verifyToken, utilizadorController.delete);

router.route('/:utilizadorID/favoritos/:filmeID')
    .post(autenticadoController.verifyToken, utilizadorController.addFavoritos);

router.route('/:utilizadorID/lista/:filmeID')
    .post(autenticadoController.verifyToken, utilizadorController.addLista);

router.route('/:utilizadorID/desafio/:jogoID')
    .post(autenticadoController.verifyToken, utilizadorController.addDesafio);

router.route('/:utilizadorID/desafioConcluido/:desafioID')
    .post(utilizadorController.addDesafioConcluido);

router.route('/login')
    .post(utilizadorController.login);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'Filmes: what???' });
})

module.exports = router;