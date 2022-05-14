const express = require('express');
const desafioController = require("../controllers/desafios.controller");

// express router
let router = express.Router();


router.route('/')
    .get(desafioController.findAll)
    .post(desafioController.create);

router.route('/:desafioID')
    .get(desafioController.findOne)

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'Categorias: what???' });
})

module.exports = router;