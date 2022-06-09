const express = require('express');
const filmeController = require("../controllers/filmes.controller");
const autenticadoController = require("../controllers/autenticado.controller");

// express router
let router = express.Router();


router.route('/')
    .get(filmeController.findAll)
    .post(autenticadoController.verifyToken, filmeController.create);

router.route('/:filmeID')
    .get(filmeController.findOne)
    .delete(autenticadoController.verifyToken, filmeController.delete);

router.route('/:filmeID/comentarios')
    .post(filmeController.addComentario);

router.route('/:filmeID/comentarios/:comentarioID')
    .patch( filmeController.updateComentario);

router.route('/:filmeID/avaliacao')
    .patch(autenticadoController.verifyToken, filmeController.updateAvaliacao);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'Filmes: what???' });
})

module.exports = router;