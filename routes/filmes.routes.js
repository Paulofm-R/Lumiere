const express = require('express');
const filmeController = require("../controllers/filmes.controller");

// express router
let router = express.Router();


router.route('/')
    .get(filmeController.findAll)
    .post(filmeController.create);

router.route('/:filmeID')
    .get(filmeController.findOne)
    .delete(filmeController.delete);

// router.route('/:filmeID/comentarios/:comentarioID')
//     .patch(filmeController.update)

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'Filmes: what???' });
})

module.exports = router;