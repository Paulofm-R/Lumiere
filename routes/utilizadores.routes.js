const express = require('express');
const utilizadorController = require("../controllers/utilizadores.controller");

// express router
let router = express.Router();

router.route('/')
    .get(utilizadorController.findAll)
    .post(utilizadorController.create);

router.route('/:utilizadorID')
    .patch(utilizadorController.update)
    .get(utilizadorController.findOne)
    .delete(utilizadorController.delete);

router.route('/:utilizadorID/favoritos/:filmeID')
    .post(utilizadorController.addFavoritos);

router.route('/:utilizadorID/lista/:filmeID')
    .post(utilizadorController.addLista);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'Filmes: what???' });
})

module.exports = router;